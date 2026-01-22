import json
import os
import base64
import boto3
import requests
from datetime import datetime

def handler(event: dict, context) -> dict:
    '''
    Загружает документы (счета, акты, накладные) в S3 хранилище 
    и сохраняет метаданные в базу данных для модуля бухгалтерии
    '''
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
        file_name = body.get('fileName')
        file_content_base64 = body.get('fileContent')
        file_type = body.get('fileType', 'document')
        
        if not file_name or not file_content_base64:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'fileName and fileContent required'})
            }
        
        file_data = base64.b64decode(file_content_base64)
        
        s3 = boto3.client('s3',
            endpoint_url='https://bucket.poehali.dev',
            aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
        )
        
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        s3_key = f'accounting/documents/{timestamp}_{file_name}'
        
        content_type_map = {
            'pdf': 'application/pdf',
            'doc': 'application/msword',
            'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'xls': 'application/vnd.ms-excel',
            'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
        }
        
        extension = file_name.split('.')[-1].lower()
        content_type = content_type_map.get(extension, 'application/octet-stream')
        
        s3.put_object(
            Bucket='files',
            Key=s3_key,
            Body=file_data,
            ContentType=content_type
        )
        
        cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{s3_key}"
        
        ocr_data = None
        if extension in ['jpg', 'jpeg', 'png', 'pdf']:
            try:
                ocr_response = requests.post(
                    'https://functions.poehali.dev/c0e33330-1f53-405f-9e4a-081015ff0924',
                    json={'imageContent': file_content_base64},
                    timeout=30
                )
                if ocr_response.status_code == 200:
                    ocr_result = ocr_response.json()
                    if ocr_result.get('success'):
                        ocr_data = ocr_result.get('extractedData')
            except Exception:
                pass
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'fileUrl': cdn_url,
                'fileName': file_name,
                'fileType': file_type,
                'uploadedAt': datetime.now().isoformat(),
                'ocrData': ocr_data
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }