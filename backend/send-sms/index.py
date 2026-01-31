import json
import os
import random
import psycopg2
from datetime import datetime, timedelta
import requests

def handler(event: dict, context) -> dict:
    """Отправка SMS-кода для авторизации пользователя"""
    
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
        
        if not phone or len(phone) != 11:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Invalid phone number'}),
                'isBase64Encoded': False
            }
        
        code = str(random.randint(1000, 9999))
        
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        expires_at = (datetime.now() + timedelta(minutes=5)).isoformat()
        
        cur.execute("""
            INSERT INTO sms_codes (phone, code, expires_at, created_at)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (phone) 
            DO UPDATE SET code = EXCLUDED.code, expires_at = EXCLUDED.expires_at, created_at = EXCLUDED.created_at
        """, (phone, code, expires_at, datetime.now().isoformat()))
        
        conn.commit()
        cur.close()
        conn.close()
        
        sms_api_key = os.environ.get('SMS_API_KEY', '')
        if sms_api_key:
            sms_url = f"https://sms.ru/sms/send?api_id={sms_api_key}&to={phone}&msg=Ваш код для входа: {code}&json=1"
            requests.get(sms_url, timeout=5)
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True, 'message': 'Code sent'}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
