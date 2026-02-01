import json
import os
import requests


def handler(event: dict, context) -> dict:
    '''Отправка заявок через Telegram Bot на zakaz6377@yandex.ru'''
    method = event.get('httpMethod', 'POST')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }

    try:
        body = json.loads(event.get('body', '{}'))
        
        name = body.get('name', '').strip()
        email = body.get('email', '').strip()
        phone = body.get('phone', '').strip()
        message = body.get('message', '').strip()
        company = body.get('company', '').strip()
        city = body.get('city', '').strip()
        form_type = body.get('formType', 'contact')
        
        if not name or not email or not message:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Заполните обязательные поля: имя, email, сообщение'})
            }

        bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        chat_id = os.environ.get('TELEGRAM_ADMIN_CHAT_ID')
        
        if not bot_token or not chat_id:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Telegram настройки не сконфигурированы'})
            }

        subject = '🔔 Новая заявка с сайта БухКонтроль'
        if form_type == 'calculator':
            subject = '💰 Расчёт стоимости услуг'
        
        text_message = f"{subject}\n\n"
        text_message += f"👤 <b>Имя:</b> {name}\n"
        text_message += f"📧 <b>Email:</b> {email}\n"
        
        if phone:
            text_message += f"📱 <b>Телефон:</b> {phone}\n"
        
        if company:
            text_message += f"🏢 <b>Компания:</b> {company}\n"
        
        if city:
            text_message += f"🌍 <b>Город:</b> {city}\n"
        
        text_message += f"\n💬 <b>Сообщение:</b>\n{message}"

        response = requests.post(
            f'https://api.telegram.org/bot{bot_token}/sendMessage',
            json={
                'chat_id': chat_id,
                'text': text_message,
                'parse_mode': 'HTML'
            },
            timeout=10
        )

        if response.status_code != 200:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Ошибка отправки в Telegram', 'details': response.text})
            }

        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True, 'message': 'Заявка успешно отправлена'})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }