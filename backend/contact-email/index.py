import json
import os
import requests


def handler(event: dict, context) -> dict:
    '''Отправка заявок с контактной формы на email zakaz6377@yandex.ru'''
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

        api_key = os.environ.get('UNISENDER_API_KEY')
        sender_email = os.environ.get('UNISENDER_SENDER_EMAIL')
        sender_name = os.environ.get('UNISENDER_SENDER_NAME', 'БухКонтроль')
        
        if not api_key or not sender_email:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Email настройки не сконфигурированы'})
            }

        subject = f'Новая заявка с сайта БухКонтроль'
        if form_type == 'calculator':
            subject = f'Расчёт стоимости услуг от {name}'
        
        html_body = f'''
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #4F46E5;">Новая заявка с сайта</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px; background: #f3f4f6; font-weight: bold;">Имя:</td>
                    <td style="padding: 8px;">{name}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; background: #f3f4f6; font-weight: bold;">Email:</td>
                    <td style="padding: 8px;">{email}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; background: #f3f4f6; font-weight: bold;">Телефон:</td>
                    <td style="padding: 8px;">{phone if phone else 'Не указан'}</td>
                </tr>
        '''
        
        if company:
            html_body += f'''
                <tr>
                    <td style="padding: 8px; background: #f3f4f6; font-weight: bold;">Компания:</td>
                    <td style="padding: 8px;">{company}</td>
                </tr>
            '''
        
        if city:
            html_body += f'''
                <tr>
                    <td style="padding: 8px; background: #f3f4f6; font-weight: bold;">Город:</td>
                    <td style="padding: 8px;">{city}</td>
                </tr>
            '''
        
        html_body += f'''
                <tr>
                    <td style="padding: 8px; background: #f3f4f6; font-weight: bold;">Сообщение:</td>
                    <td style="padding: 8px;">{message.replace(chr(10), '<br>')}</td>
                </tr>
            </table>
            <br>
            <p style="color: #6B7280; font-size: 12px;">Заявка получена с сайта БухКонтроль</p>
        </body>
        </html>
        '''

        response = requests.post(
            'https://go1.unisender.ru/ru/transactional/api/v1/email/send.json',
            headers={
                'X-API-KEY': api_key,
                'Content-Type': 'application/json'
            },
            json={
                'message': {
                    'recipients': [
                        {
                            'email': 'zakaz6377@yandex.ru'
                        }
                    ],
                    'body': {
                        'html': html_body
                    },
                    'subject': subject,
                    'from_email': sender_email,
                    'from_name': sender_name,
                    'reply_to': email
                }
            },
            timeout=10
        )

        if response.status_code != 200:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Ошибка отправки письма', 'details': response.text})
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