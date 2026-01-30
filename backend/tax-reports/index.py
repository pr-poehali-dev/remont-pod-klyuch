"""
API для управления календарём налоговых отчётов в ФНС.
Позволяет просматривать, создавать и отмечать отчёты как поданные.
"""
import json
import os
import psycopg2
from datetime import datetime, timedelta
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


def get_reports(event: dict) -> dict:
    """
    GET /tax-reports?from_date=2026-01-01&to_date=2026-12-31&status=upcoming
    Получить календарь налоговых отчётов
    """
    # Авторизация
    auth_header = event.get('headers', {}).get('X-Authorization', '')
    token = auth_header.replace('Bearer ', '') if auth_header else ''
    user_id = verify_jwt(token)
    
    if not user_id:
        return cors_response(401, {"error": "Unauthorized"})
    
    # Параметры фильтрации
    params = event.get('queryStringParameters', {}) or {}
    from_date = params.get('from_date')
    to_date = params.get('to_date')
    status_filter = params.get('status')
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        schema = get_env("MAIN_DB_SCHEMA", "public")
        
        # Базовый запрос
        query_parts = [f"""
            SELECT id, report_type, report_name, description, due_date, 
                   frequency, status, submitted_at, reminder_days, 
                   created_at, updated_at
            FROM {schema}.tax_reports_calendar
            WHERE user_id = %s
        """]
        query_params = [user_id]
        
        # Фильтры
        if from_date:
            query_parts.append("AND due_date >= %s")
            query_params.append(from_date)
        
        if to_date:
            query_parts.append("AND due_date <= %s")
            query_params.append(to_date)
        
        if status_filter:
            query_parts.append("AND status = %s")
            query_params.append(status_filter)
        
        query_parts.append("ORDER BY due_date ASC, created_at DESC")
        
        cursor.execute(" ".join(query_parts), query_params)
        
        reports = []
        today = datetime.now().date()
        
        for row in cursor.fetchall():
            due_date = row[4]
            days_until_due = (due_date - today).days if due_date else None
            
            reports.append({
                "id": row[0],
                "report_type": row[1],
                "report_name": row[2],
                "description": row[3],
                "due_date": due_date.isoformat() if due_date else None,
                "frequency": row[5],
                "status": row[6],
                "submitted_at": row[7].isoformat() if row[7] else None,
                "reminder_days": row[8],
                "days_until_due": days_until_due,
                "is_urgent": days_until_due is not None and 0 <= days_until_due <= row[8],
                "created_at": row[9].isoformat() if row[9] else None,
                "updated_at": row[10].isoformat() if row[10] else None
            })
        
        cursor.close()
        conn.close()
        
        return cors_response(200, {"reports": reports})
        
    except Exception as e:
        return cors_response(500, {"error": f"Database error: {str(e)}"})


def create_report(event: dict) -> dict:
    """
    POST /tax-reports
    Создать новую запись в календаре отчётов
    Body: {
        "report_type": "vat",
        "report_name": "НДС за 4 квартал 2025",
        "description": "Декларация по НДС",
        "due_date": "2026-01-25",
        "frequency": "quarterly",
        "reminder_days": 7
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
    
    report_type = body.get('report_type', 'other')
    report_name = body.get('report_name', '')
    description = body.get('description', '')
    due_date = body.get('due_date')
    frequency = body.get('frequency', 'one_time')
    reminder_days = body.get('reminder_days', 7)
    
    if not report_name or not due_date:
        return cors_response(400, {"error": "Report name and due date are required"})
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        schema = get_env("MAIN_DB_SCHEMA", "public")
        cursor.execute(f"""
            INSERT INTO {schema}.tax_reports_calendar 
            (user_id, report_type, report_name, description, due_date, frequency, reminder_days)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            RETURNING id, status, created_at
        """, (user_id, report_type, report_name, description, due_date, frequency, reminder_days))
        
        report_id, status, created_at = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()
        
        return cors_response(201, {
            "success": True,
            "report": {
                "id": report_id,
                "report_type": report_type,
                "report_name": report_name,
                "description": description,
                "due_date": due_date,
                "frequency": frequency,
                "status": status,
                "reminder_days": reminder_days,
                "created_at": created_at.isoformat() if created_at else None
            }
        })
        
    except Exception as e:
        return cors_response(500, {"error": f"Database error: {str(e)}"})


def update_report(event: dict) -> dict:
    """
    PUT /tax-reports?id=123
    Обновить статус отчёта (например, отметить как поданный)
    Body: {
        "status": "submitted"
    }
    """
    # Авторизация
    auth_header = event.get('headers', {}).get('X-Authorization', '')
    token = auth_header.replace('Bearer ', '') if auth_header else ''
    user_id = verify_jwt(token)
    
    if not user_id:
        return cors_response(401, {"error": "Unauthorized"})
    
    # Получение ID отчёта
    params = event.get('queryStringParameters', {}) or {}
    report_id = params.get('id')
    
    if not report_id:
        return cors_response(400, {"error": "Report ID is required"})
    
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
            SELECT id FROM {schema}.tax_reports_calendar
            WHERE id = %s AND user_id = %s
        """, (report_id, user_id))
        
        if not cursor.fetchone():
            cursor.close()
            conn.close()
            return cors_response(404, {"error": "Report not found"})
        
        # Формирование запроса на обновление
        updates = []
        values = []
        
        if 'status' in body:
            updates.append("status = %s")
            values.append(body['status'])
            
            # Если статус submitted, установить submitted_at
            if body['status'] == 'submitted':
                updates.append("submitted_at = CURRENT_TIMESTAMP")
        
        if 'due_date' in body:
            updates.append("due_date = %s")
            values.append(body['due_date'])
        
        if 'reminder_days' in body:
            updates.append("reminder_days = %s")
            values.append(body['reminder_days'])
        
        if not updates:
            cursor.close()
            conn.close()
            return cors_response(400, {"error": "No fields to update"})
        
        updates.append("updated_at = CURRENT_TIMESTAMP")
        values.append(report_id)
        
        query = f"""
            UPDATE {schema}.tax_reports_calendar
            SET {', '.join(updates)}
            WHERE id = %s
            RETURNING id, report_type, report_name, description, due_date, 
                      frequency, status, submitted_at, reminder_days, 
                      created_at, updated_at
        """
        
        cursor.execute(query, values)
        row = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()
        
        return cors_response(200, {
            "success": True,
            "report": {
                "id": row[0],
                "report_type": row[1],
                "report_name": row[2],
                "description": row[3],
                "due_date": row[4].isoformat() if row[4] else None,
                "frequency": row[5],
                "status": row[6],
                "submitted_at": row[7].isoformat() if row[7] else None,
                "reminder_days": row[8],
                "created_at": row[9].isoformat() if row[9] else None,
                "updated_at": row[10].isoformat() if row[10] else None
            }
        })
        
    except Exception as e:
        return cors_response(500, {"error": f"Database error: {str(e)}"})


def handler(event: dict, context) -> dict:
    """
    Главный обработчик для работы с календарём налоговых отчётов.
    GET /tax-reports - список отчётов
    POST /tax-reports - создать отчёт
    PUT /tax-reports?id=123 - обновить отчёт
    """
    method = event.get('httpMethod', 'GET')
    
    # CORS preflight
    if method == 'OPTIONS':
        return cors_response(200, {})
    
    if method == 'GET':
        return get_reports(event)
    elif method == 'POST':
        return create_report(event)
    elif method == 'PUT':
        return update_report(event)
    else:
        return cors_response(405, {"error": "Method not allowed"})
