import json
import os
import psycopg2
from datetime import datetime
import requests

def handler(event: dict, context) -> dict:
    """Чат с ИИ-агентом на базе YandexGPT для бухгалтерских консультаций"""
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
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
        message = body.get('message', '')
        agent_id = body.get('agent_id', '')
        user_phone = body.get('user_phone', '')
        
        if not message or not agent_id:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Message and agent_id required'}),
                'isBase64Encoded': False
            }
        
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        cur.execute("""
            SELECT id FROM users WHERE agent_id = %s
        """, (agent_id,))
        
        user_result = cur.fetchone()
        if not user_result:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'User not found'}),
                'isBase64Encoded': False
            }
        
        user_id = user_result[0]
        
        cur.execute("""
            SELECT message_text, message_type FROM agent_history 
            WHERE agent_id = %s 
            ORDER BY created_at DESC 
            LIMIT 10
        """, (agent_id,))
        
        history_rows = cur.fetchall()
        history = []
        for row in reversed(history_rows):
            history.append({
                'role': 'user' if row[1] == 'user' else 'assistant',
                'text': row[0]
            })
        
        cur.execute("""
            INSERT INTO agent_history (agent_id, user_id, message_type, message_text, created_at)
            VALUES (%s, %s, %s, %s, %s)
        """, (agent_id, user_id, 'user', message, datetime.now().isoformat()))
        
        conn.commit()
        
        yandex_api_key = os.environ.get('YANDEX_GPT_API_KEY', '')
        yandex_folder_id = os.environ.get('YANDEX_FOLDER_ID', '')
        
        if not yandex_api_key or not yandex_folder_id:
            agent_response = f"Здравствуйте! Я бухгалтерский помощник. Вы спросили: '{message}'. Для полноценных ответов необходимо настроить YandexGPT API ключи."
        else:
            system_prompt = """Ты - профессиональный бухгалтерский помощник для аграриев и малого бизнеса в России. 
Твоя задача:
- Консультировать по вопросам бухучета, налогов, отчетности
- Помогать с ФГИС Зерно, Меркурий, субсидиями
- Напоминать о сроках сдачи отчетов
- Давать практические советы по оптимизации налогов
- Объяснять простым языком сложные бухгалтерские вопросы

Отвечай кратко, по делу, профессионально но дружелюбно."""

            messages = [
                {'role': 'system', 'text': system_prompt}
            ]
            
            for h in history[-5:]:
                messages.append(h)
            
            messages.append({'role': 'user', 'text': message})
            
            yandex_url = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion'
            yandex_headers = {
                'Authorization': f'Api-Key {yandex_api_key}',
                'Content-Type': 'application/json'
            }
            yandex_data = {
                'modelUri': f'gpt://{yandex_folder_id}/yandexgpt-lite',
                'completionOptions': {
                    'stream': False,
                    'temperature': 0.6,
                    'maxTokens': 2000
                },
                'messages': messages
            }
            
            try:
                response = requests.post(yandex_url, headers=yandex_headers, json=yandex_data, timeout=30)
                if response.status_code == 200:
                    result = response.json()
                    agent_response = result.get('result', {}).get('alternatives', [{}])[0].get('message', {}).get('text', 'Не удалось получить ответ')
                else:
                    agent_response = f"Произошла ошибка при обращении к YandexGPT. Статус: {response.status_code}"
            except Exception as e:
                agent_response = f"Ошибка связи с YandexGPT: {str(e)}"
        
        cur.execute("""
            INSERT INTO agent_history (agent_id, user_id, message_type, message_text, created_at)
            VALUES (%s, %s, %s, %s, %s)
        """, (agent_id, user_id, 'agent', agent_response, datetime.now().isoformat()))
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'message': agent_response,
                'agent_id': agent_id
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
