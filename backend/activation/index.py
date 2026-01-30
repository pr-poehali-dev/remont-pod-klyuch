"""
API для генерации и активации кодов доступа к мобильному приложению.
Коды создаются в личном кабинете и используются для привязки устройства.
"""
import json
import os
import psycopg2
import random
import string
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


def generate_code() -> str:
    """Сгенерировать уникальный код активации (8 символов)"""
    chars = string.ascii_uppercase + string.digits
    chars = chars.replace('O', '').replace('0', '').replace('I', '').replace('1')
    return ''.join(random.choices(chars, k=8))


def create_activation_code(event: dict) -> dict:
    """
    POST /activation
    Создать новый код активации для пользователя
    Body: {"expires_in_days": 30}
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
        body = {}
    
    expires_in_days = body.get('expires_in_days', 30)
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        schema = get_env("MAIN_DB_SCHEMA", "public")
        
        # Генерировать уникальный код
        max_attempts = 10
        code = None
        
        for _ in range(max_attempts):
            candidate = generate_code()
            cursor.execute(f"""
                SELECT id FROM {schema}.activation_codes
                WHERE code = %s
            """, (candidate,))
            
            if not cursor.fetchone():
                code = candidate
                break
        
        if not code:
            cursor.close()
            conn.close()
            return cors_response(500, {"error": "Failed to generate unique code"})
        
        # Создать код
        expires_at = datetime.now() + timedelta(days=expires_in_days)
        
        cursor.execute(f"""
            INSERT INTO {schema}.activation_codes (code, expires_at)
            VALUES (%s, %s)
            RETURNING id, created_at
        """, (code, expires_at))
        
        code_id, created_at = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()
        
        return cors_response(201, {
            "success": True,
            "code": code,
            "expires_at": expires_at.isoformat(),
            "created_at": created_at.isoformat() if created_at else None
        })
        
    except Exception as e:
        return cors_response(500, {"error": f"Database error: {str(e)}"})


def activate_code(event: dict) -> dict:
    """
    POST /activation?action=activate
    Активировать код (привязать к пользователю)
    Body: {"code": "ABC12345"}
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
    
    code = body.get('code', '').strip().upper()
    if not code:
        return cors_response(400, {"error": "Code is required"})
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        schema = get_env("MAIN_DB_SCHEMA", "public")
        
        # Проверить код
        cursor.execute(f"""
            SELECT id, user_id, used_at, expires_at
            FROM {schema}.activation_codes
            WHERE code = %s
        """, (code,))
        
        row = cursor.fetchone()
        if not row:
            cursor.close()
            conn.close()
            return cors_response(404, {"error": "Code not found"})
        
        code_id, existing_user_id, used_at, expires_at = row
        
        # Проверка использования
        if used_at:
            cursor.close()
            conn.close()
            return cors_response(400, {"error": "Code already used"})
        
        # Проверка срока действия
        if expires_at < datetime.now():
            cursor.close()
            conn.close()
            return cors_response(400, {"error": "Code expired"})
        
        # Активировать код
        cursor.execute(f"""
            UPDATE {schema}.activation_codes
            SET user_id = %s, used_at = CURRENT_TIMESTAMP
            WHERE id = %s
        """, (user_id, code_id))
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return cors_response(200, {
            "success": True,
            "message": "Code activated successfully"
        })
        
    except Exception as e:
        return cors_response(500, {"error": f"Database error: {str(e)}"})


def get_user_codes(event: dict) -> dict:
    """
    GET /activation
    Получить список кодов пользователя
    """
    # Авторизация
    auth_header = event.get('headers', {}).get('X-Authorization', '')
    token = auth_header.replace('Bearer ', '') if auth_header else ''
    user_id = verify_jwt(token)
    
    if not user_id:
        return cors_response(401, {"error": "Unauthorized"})
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        schema = get_env("MAIN_DB_SCHEMA", "public")
        
        cursor.execute(f"""
            SELECT code, used_at, expires_at, created_at
            FROM {schema}.activation_codes
            WHERE user_id = %s OR (user_id IS NULL AND expires_at > CURRENT_TIMESTAMP)
            ORDER BY created_at DESC
        """, (user_id,))
        
        codes = []
        for row in cursor.fetchall():
            codes.append({
                "code": row[0],
                "used_at": row[1].isoformat() if row[1] else None,
                "expires_at": row[2].isoformat() if row[2] else None,
                "created_at": row[3].isoformat() if row[3] else None,
                "is_active": row[1] is None and row[2] > datetime.now()
            })
        
        cursor.close()
        conn.close()
        
        return cors_response(200, {"codes": codes})
        
    except Exception as e:
        return cors_response(500, {"error": f"Database error: {str(e)}"})


def handler(event: dict, context) -> dict:
    """
    Главный обработчик для кодов активации.
    POST /activation - создать код
    POST /activation?action=activate - активировать код
    GET /activation - список кодов пользователя
    """
    method = event.get('httpMethod', 'GET')
    
    # CORS preflight
    if method == 'OPTIONS':
        return cors_response(200, {})
    
    if method == 'POST':
        params = event.get('queryStringParameters', {}) or {}
        action = params.get('action', 'create')
        
        if action == 'activate':
            return activate_code(event)
        else:
            return create_activation_code(event)
    elif method == 'GET':
        return get_user_codes(event)
    else:
        return cors_response(405, {"error": "Method not allowed"})
