import json
import os
import psycopg2
from datetime import datetime
import hashlib
import secrets

def handler(event: dict, context) -> dict:
    """Проверка SMS-кода и создание сессии с привязкой ИИ-агента"""
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        phone = body.get('phone', '').replace('+', '').replace(' ', '').replace('(', '').replace(')', '').replace('-', '')
        code = body.get('code', '')
        
        if not phone or not code:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Phone and code required'}),
                'isBase64Encoded': False
            }
        
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        cur.execute("""
            SELECT code, expires_at FROM sms_codes 
            WHERE phone = %s
        """, (phone,))
        
        result = cur.fetchone()
        
        if not result:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Code not found'}),
                'isBase64Encoded': False
            }
        
        stored_code, expires_at = result
        
        if datetime.fromisoformat(expires_at) < datetime.now():
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Code expired'}),
                'isBase64Encoded': False
            }
        
        if stored_code != code:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Invalid code'}),
                'isBase64Encoded': False
            }
        
        cur.execute("""
            SELECT id, agent_id FROM users WHERE phone = %s
        """, (phone,))
        
        user = cur.fetchone()
        
        if user:
            user_id, agent_id = user
        else:
            agent_id = f"agent_{secrets.token_hex(16)}"
            
            cur.execute("""
                INSERT INTO users (phone, agent_id, created_at)
                VALUES (%s, %s, %s)
                RETURNING id
            """, (phone, agent_id, datetime.now().isoformat()))
            
            user_id = cur.fetchone()[0]
        
        token = secrets.token_urlsafe(32)
        token_hash = hashlib.sha256(token.encode()).hexdigest()
        
        cur.execute("""
            INSERT INTO user_sessions (user_id, token_hash, created_at, expires_at)
            VALUES (%s, %s, %s, %s)
        """, (user_id, token_hash, datetime.now().isoformat(), 
              (datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)).isoformat()))
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'token': token,
                'agent_id': agent_id,
                'user_id': user_id
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
