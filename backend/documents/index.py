"""
API для загрузки и управления бухгалтерскими документами через мобильное приложение.
Поддержка загрузки фото/сканов документов в S3 с автоматическим сохранением метаданных.
"""
import json
import os
import base64
import psycopg2
import boto3
from datetime import datetime
from typing import Optional


def get_env(key: str, default: str = "") -> str:
    """Получить переменную окружения"""
    return os.environ.get(key, default)


def get_db_connection():
    """Создать подключение к базе данных"""
    dsn = get_env("DATABASE_URL")
    return psycopg2.connect(dsn)


def get_s3_client():
    """Создать S3 клиента"""
    return boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=get_env('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=get_env('AWS_SECRET_ACCESS_KEY')
    )


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


def upload_document(event: dict) -> dict:
    """
    POST /documents
    Загрузка документа в S3 и сохранение метаданных в БД.
    Body: {"file_base64": "...", "file_name": "...", "file_type": "image/jpeg"}
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
    
    file_base64 = body.get('file_base64', '')
    file_name = body.get('file_name', 'document.jpg')
    file_type = body.get('file_type', 'image/jpeg')
    
    if not file_base64:
        return cors_response(400, {"error": "Missing file_base64"})
    
    try:
        # Декодирование base64
        file_data = base64.b64decode(file_base64)
        file_size = len(file_data)
        
        # Генерация уникального имени
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        unique_name = f"documents/{user_id}/{timestamp}_{file_name}"
        
        # Загрузка в S3
        s3 = get_s3_client()
        s3.put_object(
            Bucket='files',
            Key=unique_name,
            Body=file_data,
            ContentType=file_type
        )
        
        # CDN URL
        aws_key = get_env('AWS_ACCESS_KEY_ID')
        file_url = f"https://cdn.poehali.dev/projects/{aws_key}/bucket/{unique_name}"
        
        # Сохранение в БД
        conn = get_db_connection()
        cursor = conn.cursor()
        
        schema = get_env("MAIN_DB_SCHEMA", "public")
        cursor.execute(f"""
            INSERT INTO {schema}.accounting_documents 
            (file_name, file_url, file_type, file_size, status)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id, uploaded_at
        """, (file_name, file_url, file_type, file_size, 'pending'))
        
        doc_id, uploaded_at = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()
        
        return cors_response(200, {
            "success": True,
            "document": {
                "id": doc_id,
                "file_name": file_name,
                "file_url": file_url,
                "file_type": file_type,
                "file_size": file_size,
                "uploaded_at": uploaded_at.isoformat() if uploaded_at else None
            }
        })
        
    except Exception as e:
        return cors_response(500, {"error": f"Upload failed: {str(e)}"})


def get_documents(event: dict) -> dict:
    """
    GET /documents?limit=50&offset=0
    Получить список документов пользователя
    """
    # Авторизация
    auth_header = event.get('headers', {}).get('X-Authorization', '')
    token = auth_header.replace('Bearer ', '') if auth_header else ''
    user_id = verify_jwt(token)
    
    if not user_id:
        return cors_response(401, {"error": "Unauthorized"})
    
    # Параметры пагинации
    params = event.get('queryStringParameters', {}) or {}
    limit = int(params.get('limit', 50))
    offset = int(params.get('offset', 0))
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        schema = get_env("MAIN_DB_SCHEMA", "public")
        cursor.execute(f"""
            SELECT id, file_name, file_url, file_type, file_size, 
                   status, uploaded_at, processed_at
            FROM {schema}.accounting_documents
            ORDER BY uploaded_at DESC
            LIMIT %s OFFSET %s
        """, (limit, offset))
        
        documents = []
        for row in cursor.fetchall():
            documents.append({
                "id": row[0],
                "file_name": row[1],
                "file_url": row[2],
                "file_type": row[3],
                "file_size": row[4],
                "status": row[5],
                "uploaded_at": row[6].isoformat() if row[6] else None,
                "processed_at": row[7].isoformat() if row[7] else None
            })
        
        cursor.close()
        conn.close()
        
        return cors_response(200, {"documents": documents})
        
    except Exception as e:
        return cors_response(500, {"error": f"Database error: {str(e)}"})


def handler(event: dict, context) -> dict:
    """
    Главный обработчик для работы с документами.
    POST /documents - загрузка документа
    GET /documents - список документов
    """
    method = event.get('httpMethod', 'GET')
    
    # CORS preflight
    if method == 'OPTIONS':
        return cors_response(200, {})
    
    if method == 'POST':
        return upload_document(event)
    elif method == 'GET':
        return get_documents(event)
    else:
        return cors_response(405, {"error": "Method not allowed"})
