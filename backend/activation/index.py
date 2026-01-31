"""API для генерации и активации кодов доступа к мобильному приложению"""
import json
import os
import random
import string
from datetime import datetime, timedelta
import psycopg2
from psycopg2.extras import RealDictCursor
import jwt

def get_db_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def verify_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, os.environ['JWT_SECRET'], algorithms=['HS256'])
        return payload
    except:
        return None

def generate_activation_code(length=8):
    chars = string.ascii_uppercase + string.digits
    chars = chars.replace('O', '').replace('0', '').replace('I', '').replace('1', '')
    return ''.join(random.choice(chars) for _ in range(length))

def handler(event: dict, context) -> dict:
    """API для управления кодами активации"""
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
            action = event.get('queryStringParameters', {}).get('action', 'create')
            
            if action == 'create':
                code = generate_activation_code()
                expires_days = data.get('expires_days', 30)
                expires_at = datetime.now() + timedelta(days=expires_days)
                
                cur.execute("""
                    INSERT INTO activation_codes (user_id, code, expires_at, is_active)
                    VALUES (%s, %s, %s, TRUE)
                    RETURNING id, code, created_at, expires_at, is_active
                """, (user_id, code, expires_at))
                
                result = dict(cur.fetchone())
                conn.commit()
                
                return {
                    'statusCode': 201,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(result, default=str),
                    'isBase64Encoded': False
                }
            
            elif action == 'activate':
                code = data.get('code', '').upper()
                
                cur.execute("""
                    SELECT id, user_id, expires_at, is_active, used_at
                    FROM activation_codes
                    WHERE code = %s
                """, (code,))
                
                code_data = cur.fetchone()
                
                if not code_data:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Code not found'}),
                        'isBase64Encoded': False
                    }
                
                if code_data['used_at']:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Code already used'}),
                        'isBase64Encoded': False
                    }
                
                if datetime.now() > code_data['expires_at']:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Code expired'}),
                        'isBase64Encoded': False
                    }
                
                cur.execute("""
                    UPDATE activation_codes
                    SET used_at = CURRENT_TIMESTAMP, is_active = FALSE
                    WHERE id = %s
                    RETURNING id, code, used_at
                """, (code_data['id'],))
                
                result = dict(cur.fetchone())
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True, 'data': result}, default=str),
                    'isBase64Encoded': False
                }
        
        elif method == 'GET':
            cur.execute("""
                SELECT id, code, created_at, expires_at, is_active, used_at
                FROM activation_codes
                WHERE user_id = %s
                ORDER BY created_at DESC
            """, (user_id,))
            
            codes = [dict(row) for row in cur.fetchall()]
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(codes, default=str),
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
