"""AI-ассистент для общения с клиентами и автоматического создания задач"""
import json
import os
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor
import jwt
import requests

def get_db_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def verify_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, os.environ['JWT_SECRET'], algorithms=['HS256'])
        return payload
    except:
        return None

def call_yandex_gpt(messages: list) -> str:
    api_key = os.environ.get('YANDEX_GPT_API_KEY')
    folder_id = os.environ.get('YANDEX_FOLDER_ID')
    
    if not api_key or not folder_id:
        return "Извините, AI-ассистент временно недоступен. Пожалуйста, напишите ваш вопрос в свободной форме."
    
    headers = {
        'Authorization': f'Api-Key {api_key}',
        'Content-Type': 'application/json'
    }
    
    system_prompt = """Ты - AI-помощник бухгалтерской компании БухКонтроль, специализирующейся на агросекторе.
Твоя задача: отвечать на вопросы клиентов о бухгалтерских услугах, налогах, отчётности.
Если клиент просит что-то сделать (выставить счёт, подготовить отчёт и т.д.), ты должен:
1. Подтвердить запрос клиента
2. В конце ответа добавить JSON с задачей в формате: {"task": {"type": "invoice|payment|report|consultation|other", "title": "краткое название", "description": "описание задачи", "priority": "low|medium|high|urgent"}}

Примеры задач от клиентов:
- "Мне нужен счёт на 50000" → type: invoice
- "Когда сдавать НДС?" → type: consultation
- "Подготовьте отчёт 29-СХ" → type: report

Отвечай кратко, профессионально, по-русски."""
    
    payload = {
        'modelUri': f'gpt://{folder_id}/yandexgpt-lite',
        'completionOptions': {
            'stream': False,
            'temperature': 0.6,
            'maxTokens': 500
        },
        'messages': [
            {'role': 'system', 'text': system_prompt}
        ] + messages
    }
    
    try:
        response = requests.post(
            'https://llm.api.cloud.yandex.net/foundationModels/v1/completion',
            headers=headers,
            json=payload,
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            return result['result']['alternatives'][0]['message']['text']
        else:
            return f"Извините, произошла ошибка при обработке запроса. Пожалуйста, попробуйте позже или свяжитесь с нами напрямую."
    except Exception as e:
        return f"Извините, временные технические неполадки. Ваш вопрос: {messages[-1]['text'][:50]}... - будет обработан вручную."

def extract_task_from_response(ai_response: str) -> dict:
    try:
        if '{"task":' in ai_response:
            start = ai_response.find('{"task":')
            end = ai_response.find('}', start) + 1
            task_json = ai_response[start:end]
            task_data = json.loads(task_json)
            return task_data.get('task')
    except:
        pass
    return None

def handler(event: dict, context) -> dict:
    """API для AI-чата с автоматическим созданием задач"""
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    auth_header = event.get('headers', {}).get('X-Authorization', '')
    token = auth_header.replace('Bearer ', '') if auth_header else None
    user_data = verify_token(token) if token else None
    
    if not user_data:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Unauthorized'}),
            'isBase64Encoded': False
        }
    
    user_id = user_data.get('user_id')
    conn = get_db_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'POST':
            data = json.loads(event.get('body', '{}'))
            user_message = data.get('message', '').strip()
            
            if not user_message:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Message is required'}),
                    'isBase64Encoded': False
                }
            
            cur.execute("""
                INSERT INTO ai_chat_messages (user_id, role, message, created_at)
                VALUES (%s, 'user', %s, CURRENT_TIMESTAMP)
            """, (user_id, user_message))
            
            cur.execute("""
                SELECT role, message FROM ai_chat_messages
                WHERE user_id = %s
                ORDER BY created_at DESC
                LIMIT 10
            """, (user_id,))
            
            history = [{'role': row['role'], 'text': row['message']} for row in reversed(cur.fetchall())]
            
            ai_response = call_yandex_gpt(history)
            
            task_data = extract_task_from_response(ai_response)
            
            clean_response = ai_response.split('{"task":')[0].strip() if task_data else ai_response
            
            cur.execute("""
                INSERT INTO ai_chat_messages (user_id, role, message, created_at)
                VALUES (%s, 'assistant', %s, CURRENT_TIMESTAMP)
                RETURNING id
            """, (user_id, clean_response))
            
            message_id = cur.fetchone()['id']
            task_id = None
            
            if task_data:
                cur.execute("""
                    INSERT INTO accountant_tasks 
                    (user_id, task_type, title, description, priority, status, created_at)
                    VALUES (%s, %s, %s, %s, %s, 'pending', CURRENT_TIMESTAMP)
                    RETURNING id
                """, (
                    user_id,
                    task_data.get('type', 'other'),
                    task_data.get('title', 'Новая задача'),
                    task_data.get('description', user_message),
                    task_data.get('priority', 'medium')
                ))
                
                task_id = cur.fetchone()['id']
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'message': clean_response,
                    'task_created': task_id is not None,
                    'task_id': task_id
                }, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'GET':
            limit = int(event.get('queryStringParameters', {}).get('limit', 20))
            
            cur.execute("""
                SELECT id, role, message, created_at
                FROM ai_chat_messages
                WHERE user_id = %s
                ORDER BY created_at DESC
                LIMIT %s
            """, (user_id, limit))
            
            messages = [dict(row) for row in reversed(cur.fetchall())]
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(messages, default=str),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        cur.close()
        conn.close()
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
