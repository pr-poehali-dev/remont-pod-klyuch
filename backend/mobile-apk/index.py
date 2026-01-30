import json
import os
import boto3

def handler(event: dict, context) -> dict:
    '''API для получения ссылки на скачивание APK мобильного приложения'''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }

    if method == 'GET':
        # Проверяем наличие APK в S3
        s3 = boto3.client('s3',
            endpoint_url='https://bucket.poehali.dev',
            aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
        )

        apk_key = 'mobile/remont-pod-klyuch.apk'
        
        try:
            # Проверяем существование файла
            s3.head_object(Bucket='files', Key=apk_key)
            
            # Формируем публичную ссылку на CDN
            cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{apk_key}"
            
            # Получаем метаданные файла
            obj_info = s3.head_object(Bucket='files', Key=apk_key)
            file_size = obj_info['ContentLength']
            last_modified = obj_info['LastModified'].isoformat()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'downloadUrl': cdn_url,
                    'fileName': 'remont-pod-klyuch.apk',
                    'fileSize': file_size,
                    'lastModified': last_modified,
                    'version': '1.0.0'
                })
            }
        except s3.exceptions.ClientError:
            # Файл не найден - возвращаем инструкцию по сборке
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': False,
                    'message': 'APK-файл ещё не собран. Следуйте инструкции для сборки.',
                    'buildInstructionsUrl': '/mobile-build-guide'
                })
            }

    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'})
    }
