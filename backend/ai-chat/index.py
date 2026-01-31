"""
AI-агент для общения с клиентами и автоматического распределения задач бухгалтеру.
Использует OpenAI GPT для понимания запросов и создания задач.
"""
import json
import os
import psycopg2
from datetime import datetime
from typing import Optional, List, Dict


def get_env(key: str, default: str = "") -> str:
    """Получить переменную окружения"""
    return os.environ.get(key, default)


def get_db_connection():
    """Создать подключение к базе данных"""
    dsn = get_env("DATABASE_URL")
    return psycopg2.connect(dsn)


def cors_response(status_code: int, body: dict) -> dict:
    """Формирование ответа с CORS заголовками"""
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
        },
        'body': json.dumps(body, ensure_ascii=False, default=str)
    }


def verify_jwt(token: str) -> Optional[int]:
    """Проверка JWT токена и извлечение user_id"""
    if not token:
        return None
    
    import jwt
    try:
        jwt_secret = get_env("JWT_SECRET")
        payload = jwt.decode(token, jwt_secret, algorithms=["HS256"])
        return payload.get("user_id")
    except:
        return None


def get_chat_history(cursor, user_id: int, limit: int = 10) -> List[Dict]:
    """Получить последние сообщения чата"""
    schema = get_env("MAIN_DB_SCHEMA", "public")
    cursor.execute(f"""
        SELECT role, content, created_at
        FROM {schema}.ai_chat_messages
        WHERE user_id = %s
        ORDER BY created_at DESC
        LIMIT %s
    """, (user_id, limit))
    
    messages = []
    for row in reversed(cursor.fetchall()):
        messages.append({
            "role": row[0],
            "content": row[1]
        })
    return messages


def save_message(cursor, user_id: int, role: str, content: str):
    """Сохранить сообщение в историю"""
    schema = get_env("MAIN_DB_SCHEMA", "public")
    cursor.execute(f"""
        INSERT INTO {schema}.ai_chat_messages (user_id, role, content)
        VALUES (%s, %s, %s)
    """, (user_id, role, content))


def get_accountant_for_client(cursor, user_id: int) -> Optional[int]:
    """Получить ID закреплённого бухгалтера"""
    schema = get_env("MAIN_DB_SCHEMA", "public")
    cursor.execute(f"""
        SELECT accountant_id
        FROM {schema}.client_accountant_assignments
        WHERE client_user_id = %s AND is_active = true
    """, (user_id,))
    
    row = cursor.fetchone()
    return row[0] if row else None


def create_task_for_accountant(cursor, user_id: int, task_data: dict) -> int:
    """Создать задачу бухгалтеру"""
    schema = get_env("MAIN_DB_SCHEMA", "public")
    
    cursor.execute(f"""
        INSERT INTO {schema}.accountant_tasks 
        (user_id, task_type, title, description, priority, status)
        VALUES (%s, %s, %s, %s, %s, 'pending')
        RETURNING id
    """, (
        user_id,
        task_data.get('task_type', 'other'),
        task_data.get('title', ''),
        task_data.get('description', ''),
        task_data.get('priority', 'medium')
    ))
    
    task_id = cursor.fetchone()[0]
    
    # Логирование действия AI
    cursor.execute(f"""
        INSERT INTO {schema}.ai_agent_actions 
        (user_id, action_type, action_data, task_id)
        VALUES (%s, 'create_task', %s, %s)
    """, (user_id, json.dumps(task_data), task_id))
    
    return task_id


def call_openai(messages: List[Dict]) -> str:
    """Вызов OpenAI API для генерации ответа"""
    try:
        from openai import OpenAI
        
        client = OpenAI(api_key=get_env("OPENAI_API_KEY"))
        
        system_prompt = """Ты - AI-ассистент бухгалтерской компании "Ремонт под ключ".
Твоя задача:
1. Отвечать на вопросы клиентов о бухгалтерских услугах
2. Помогать формулировать задачи для бухгалтера
3. Быть дружелюбным и профессиональным

Когда клиент просит что-то сделать (счёт, отчёт, консультацию), отвечай в формате JSON:
{
  "response": "Ваш текстовый ответ клиенту",
  "create_task": {
    "task_type": "invoice|payment|report|consultation|other",
    "title": "Краткое название",
    "description": "Полное описание",
    "priority": "low|medium|high|urgent"
  }
}

Если это обычный вопрос, отвечай просто текстом без JSON."""

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                *messages
            ],
            temperature=0.7,
            max_tokens=500
        )
        
        return response.choices[0].message.content
    except Exception as e:
        return f"Извините, произошла ошибка: {str(e)}"


def process_message(event: dict) -> dict:
    """
    POST /ai-chat
    Обработка сообщения от клиента
    Body: {"message": "Мне нужен счёт на оплату"}
    """
    # Авторизация
    auth_header = event.get('headers', {}).get('X-Authorization', '')
    token = auth_header.replace('Bearer ', '') if auth_header else ''
    user_id = verify_jwt(token)
    
    if not user_id:
        return cors_response(401, {"error": "Unauthorized"})
    
    # Парсинг запроса
    try:
        body = json.loads(event.get('body', '{}'))
    except:
        return cors_response(400, {"error": "Invalid JSON"})
    
    user_message = body.get('message', '').strip()
    if not user_message:
        return cors_response(400, {"error": "Message is required"})
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Сохранить сообщение пользователя
        save_message(cursor, user_id, "user", user_message)
        
        # Получить историю
        chat_history = get_chat_history(cursor, user_id, limit=10)
        
        # Вызвать OpenAI
        ai_response = call_openai(chat_history)
        
        # Попробовать распарсить как JSON (создание задачи)
        task_created = False
        task_id = None
        response_text = ai_response
        
        try:
            parsed = json.loads(ai_response)
            if 'create_task' in parsed:
                task_id = create_task_for_accountant(cursor, user_id, parsed['create_task'])
                task_created = True
                response_text = parsed.get('response', 'Задача создана для вашего бухгалтера.')
        except:
            # Не JSON - обычный текстовый ответ
            pass
        
        # Сохранить ответ AI
        save_message(cursor, user_id, "assistant", response_text)
        
        # Получить инфо о бухгалтере
        accountant_id = get_accountant_for_client(cursor, user_id)
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return cors_response(200, {
            "response": response_text,
            "task_created": task_created,
            "task_id": task_id,
            "has_accountant": accountant_id is not None
        })
        
    except Exception as e:
        return cors_response(500, {"error": f"Error: {str(e)}"})


def get_history(event: dict) -> dict:
    """
    GET /ai-chat?limit=20
    Получить историю чата
    """
    # Авторизация
    auth_header = event.get('headers', {}).get('X-Authorization', '')
    token = auth_header.replace('Bearer ', '') if auth_header else ''
    user_id = verify_jwt(token)
    
    if not user_id:
        return cors_response(401, {"error": "Unauthorized"})
    
    params = event.get('queryStringParameters', {}) or {}
    limit = int(params.get('limit', 50))
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        schema = get_env("MAIN_DB_SCHEMA", "public")
        
        cursor.execute(f"""
            SELECT role, content, created_at
            FROM {schema}.ai_chat_messages
            WHERE user_id = %s
            ORDER BY created_at DESC
            LIMIT %s
        """, (user_id, limit))
        
        messages = []
        for row in reversed(cursor.fetchall()):
            messages.append({
                "role": row[0],
                "content": row[1],
                "created_at": row[2].isoformat() if row[2] else None
            })
        
        cursor.close()
        conn.close()
        
        return cors_response(200, {"messages": messages})
        
    except Exception as e:
        return cors_response(500, {"error": f"Database error: {str(e)}"})


def handler(event: dict, context) -> dict:
    """
    Главный обработчик AI-чата.
    POST /ai-chat - отправить сообщение
    GET /ai-chat - получить историю
    """
    method = event.get('httpMethod', 'GET')
    
    # CORS preflight
    if method == 'OPTIONS':
        return cors_response(200, {})
    
    if method == 'POST':
        return process_message(event)
    elif method == 'GET':
        return get_history(event)
    else:
        return cors_response(405, {"error": "Method not allowed"})
