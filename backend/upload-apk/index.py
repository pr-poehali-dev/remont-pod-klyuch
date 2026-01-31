import json
import os
import boto3
import base64
import psycopg2

def handler(event: dict, context) -> dict:
    '''API для загрузки APK-файла в облачное хранилище через браузер'''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }

    # GET запрос - вернуть текущий URL APK
    if method == 'GET':
        try:
            conn = psycopg2.connect(os.environ['DATABASE_URL'])
            cur = conn.cursor()
            
            cur.execute("""
                SELECT download_url, file_name 
                FROM mobile_apk_versions 
                WHERE is_active = true 
                ORDER BY uploaded_at DESC 
                LIMIT 1
            """)
            
            result = cur.fetchone()
            cur.close()
            conn.close()
            
            if result:
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'success': True,
                        'downloadUrl': result[0],
                        'fileName': result[1]
                    })
                }
            else:
                return {
                    'statusCode': 404,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'success': False,
                        'error': 'APK файл еще не загружен'
                    })
                }
                
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': f'Ошибка БД: {str(e)}'})
            }

    if method == 'POST':
        body_str = event.get('body', '{}')
        body = json.loads(body_str) if isinstance(body_str, str) else body_str
        
        # Получаем base64-закодированный файл
        file_base64 = body.get('file') if isinstance(body, dict) else None
        file_name = body.get('fileName', 'remont-pod-klyuch.apk') if isinstance(body, dict) else 'remont-pod-klyuch.apk'
        
        if not file_base64:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Файл не предоставлен'})
            }
        
        try:
            # Декодируем base64
            file_data = base64.b64decode(file_base64)
            
            # Загружаем в S3
            s3 = boto3.client('s3',
                endpoint_url='https://bucket.poehali.dev',
                aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
                aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
            )
            
            apk_key = f'mobile/{file_name}'
            
            s3.put_object(
                Bucket='files',
                Key=apk_key,
                Body=file_data,
                ContentType='application/vnd.android.package-archive'
            )
            
            # Формируем публичную ссылку
            cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{apk_key}"
            
            # Сохраняем в базу данных
            conn = psycopg2.connect(os.environ['DATABASE_URL'])
            cur = conn.cursor()
            
            # Деактивируем предыдущие версии
            cur.execute("""
                UPDATE mobile_apk_versions 
                SET is_active = false 
                WHERE is_active = true
            """)
            
            # Добавляем новую версию
            cur.execute("""
                INSERT INTO mobile_apk_versions 
                (file_name, download_url, is_active) 
                VALUES (%s, %s, %s)
            """, (file_name, cdn_url, True))
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'message': 'APK успешно загружен',
                    'downloadUrl': cdn_url,
                    'fileName': file_name
                })
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': f'Ошибка загрузки: {str(e)}'})
            }

    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'})
    }