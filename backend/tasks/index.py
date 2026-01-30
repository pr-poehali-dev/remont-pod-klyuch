"""
API для управления задачами бухгалтеру через мобильное приложение.
Позволяет создавать, просматривать и обновлять задачи для бухгалтера.
"""
import json
import os
import psycopg2
from datetime import datetime
from typing import Optional


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
            'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
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


def create_task(event: dict) -> dict:
    """
    POST /tasks
    Создать новую задачу для бухгалтера
    Body: {
        "task_type": "invoice",
        "title": "Сформировать счёт на оплату",
        "description": "Счёт на сумму 50000 руб для ООО Ромашка",
        "priority": "high",
        "due_date": "2026-02-15T12:00:00"
    }
    """
    # Авторизация
    auth_header = event.get('headers', {}).get('X-Authorization', '')
    token = auth_header.replace('Bearer ', '') if auth_header else ''
    user_id = verify_jwt(token)
    
    if not user_id:
        return cors_response(401, {"error": "Unauthorized"})
    
    # Парсинг тела запроса
    try:
        body = json.loads(event.get('body', '{}'))
    except:
        return cors_response(400, {"error": "Invalid JSON"})
    
    task_type = body.get('task_type', 'other')
    title = body.get('title', '')
    description = body.get('description', '')
    priority = body.get('priority', 'medium')
    due_date = body.get('due_date')
    
    if not title:
        return cors_response(400, {"error": "Title is required"})
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        schema = get_env("MAIN_DB_SCHEMA", "public")
        cursor.execute(f"""
            INSERT INTO {schema}.accountant_tasks 
            (user_id, task_type, title, description, priority, due_date)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id, status, created_at
        """, (user_id, task_type, title, description, priority, due_date))
        
        task_id, status, created_at = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()
        
        return cors_response(201, {
            "success": True,
            "task": {
                "id": task_id,
                "task_type": task_type,
                "title": title,
                "description": description,
                "status": status,
                "priority": priority,
                "due_date": due_date,
                "created_at": created_at.isoformat() if created_at else None
            }
        })
        
    except Exception as e:
        return cors_response(500, {"error": f"Database error: {str(e)}"})


def get_tasks(event: dict) -> dict:
    """
    GET /tasks?status=pending&limit=50&offset=0
    Получить список задач пользователя
    """
    # Авторизация
    auth_header = event.get('headers', {}).get('X-Authorization', '')
    token = auth_header.replace('Bearer ', '') if auth_header else ''
    user_id = verify_jwt(token)
    
    if not user_id:
        return cors_response(401, {"error": "Unauthorized"})
    
    # Параметры фильтрации и пагинации
    params = event.get('queryStringParameters', {}) or {}
    status_filter = params.get('status')
    limit = int(params.get('limit', 50))
    offset = int(params.get('offset', 0))
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        schema = get_env("MAIN_DB_SCHEMA", "public")
        
        if status_filter:
            cursor.execute(f"""
                SELECT id, task_type, title, description, status, priority, 
                       due_date, completed_at, created_at, updated_at
                FROM {schema}.accountant_tasks
                WHERE user_id = %s AND status = %s
                ORDER BY 
                    CASE priority 
                        WHEN 'urgent' THEN 1
                        WHEN 'high' THEN 2
                        WHEN 'medium' THEN 3
                        ELSE 4
                    END,
                    due_date ASC NULLS LAST,
                    created_at DESC
                LIMIT %s OFFSET %s
            """, (user_id, status_filter, limit, offset))
        else:
            cursor.execute(f"""
                SELECT id, task_type, title, description, status, priority, 
                       due_date, completed_at, created_at, updated_at
                FROM {schema}.accountant_tasks
                WHERE user_id = %s
                ORDER BY 
                    CASE status 
                        WHEN 'in_progress' THEN 1
                        WHEN 'pending' THEN 2
                        ELSE 3
                    END,
                    CASE priority 
                        WHEN 'urgent' THEN 1
                        WHEN 'high' THEN 2
                        WHEN 'medium' THEN 3
                        ELSE 4
                    END,
                    due_date ASC NULLS LAST
                LIMIT %s OFFSET %s
            """, (user_id, limit, offset))
        
        tasks = []
        for row in cursor.fetchall():
            tasks.append({
                "id": row[0],
                "task_type": row[1],
                "title": row[2],
                "description": row[3],
                "status": row[4],
                "priority": row[5],
                "due_date": row[6].isoformat() if row[6] else None,
                "completed_at": row[7].isoformat() if row[7] else None,
                "created_at": row[8].isoformat() if row[8] else None,
                "updated_at": row[9].isoformat() if row[9] else None
            })
        
        cursor.close()
        conn.close()
        
        return cors_response(200, {"tasks": tasks})
        
    except Exception as e:
        return cors_response(500, {"error": f"Database error: {str(e)}"})


def update_task(event: dict) -> dict:
    """
    PUT /tasks?id=123
    Обновить задачу (статус, описание и т.д.)
    Body: {
        "status": "completed",
        "description": "Обновлённое описание"
    }
    """
    # Авторизация
    auth_header = event.get('headers', {}).get('X-Authorization', '')
    token = auth_header.replace('Bearer ', '') if auth_header else ''
    user_id = verify_jwt(token)
    
    if not user_id:
        return cors_response(401, {"error": "Unauthorized"})
    
    # Получение ID задачи
    params = event.get('queryStringParameters', {}) or {}
    task_id = params.get('id')
    
    if not task_id:
        return cors_response(400, {"error": "Task ID is required"})
    
    # Парсинг тела запроса
    try:
        body = json.loads(event.get('body', '{}'))
    except:
        return cors_response(400, {"error": "Invalid JSON"})
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        schema = get_env("MAIN_DB_SCHEMA", "public")
        
        # Проверка прав доступа
        cursor.execute(f"""
            SELECT id FROM {schema}.accountant_tasks
            WHERE id = %s AND user_id = %s
        """, (task_id, user_id))
        
        if not cursor.fetchone():
            cursor.close()
            conn.close()
            return cors_response(404, {"error": "Task not found"})
        
        # Формирование запроса на обновление
        updates = []
        values = []
        
        if 'status' in body:
            updates.append("status = %s")
            values.append(body['status'])
            
            # Если статус completed, установить completed_at
            if body['status'] == 'completed':
                updates.append("completed_at = CURRENT_TIMESTAMP")
        
        if 'title' in body:
            updates.append("title = %s")
            values.append(body['title'])
        
        if 'description' in body:
            updates.append("description = %s")
            values.append(body['description'])
        
        if 'priority' in body:
            updates.append("priority = %s")
            values.append(body['priority'])
        
        if 'due_date' in body:
            updates.append("due_date = %s")
            values.append(body['due_date'])
        
        if not updates:
            cursor.close()
            conn.close()
            return cors_response(400, {"error": "No fields to update"})
        
        updates.append("updated_at = CURRENT_TIMESTAMP")
        values.append(task_id)
        
        query = f"""
            UPDATE {schema}.accountant_tasks
            SET {', '.join(updates)}
            WHERE id = %s
            RETURNING id, task_type, title, description, status, priority, 
                      due_date, completed_at, created_at, updated_at
        """
        
        cursor.execute(query, values)
        row = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()
        
        return cors_response(200, {
            "success": True,
            "task": {
                "id": row[0],
                "task_type": row[1],
                "title": row[2],
                "description": row[3],
                "status": row[4],
                "priority": row[5],
                "due_date": row[6].isoformat() if row[6] else None,
                "completed_at": row[7].isoformat() if row[7] else None,
                "created_at": row[8].isoformat() if row[8] else None,
                "updated_at": row[9].isoformat() if row[9] else None
            }
        })
        
    except Exception as e:
        return cors_response(500, {"error": f"Database error: {str(e)}"})


def handler(event: dict, context) -> dict:
    """
    Главный обработчик для работы с задачами бухгалтера.
    POST /tasks - создать задачу
    GET /tasks - список задач
    PUT /tasks?id=123 - обновить задачу
    """
    method = event.get('httpMethod', 'GET')
    
    # CORS preflight
    if method == 'OPTIONS':
        return cors_response(200, {})
    
    if method == 'POST':
        return create_task(event)
    elif method == 'GET':
        return get_tasks(event)
    elif method == 'PUT':
        return update_task(event)
    else:
        return cors_response(405, {"error": "Method not allowed"})
