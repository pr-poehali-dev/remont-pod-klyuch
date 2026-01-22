import json
import os
import re
import base64
import requests
from datetime import datetime
from typing import Optional, Dict, List

def handler(event: dict, context) -> dict:
    '''
    Распознаёт текст на загруженных документах через OCR (Yandex Vision)
    и извлекает суммы, даты, номера счетов из счетов и актов
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
        body_str = event.get('body', '{}')
        if not body_str or body_str == '':
            body_str = '{}'
        body = json.loads(body_str)
        image_base64 = body.get('imageContent')
        
        if not image_base64:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'imageContent required'})
            }
        
        api_key = os.environ.get('YANDEX_OCR_API_KEY')
        
        if not api_key:
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': False,
                    'error': 'OCR not configured',
                    'extractedData': None
                })
            }
        
        ocr_result = recognize_text_yandex(image_base64, api_key)
        
        if not ocr_result:
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'extractedData': None,
                    'rawText': ''
                })
            }
        
        extracted_data = extract_financial_data(ocr_result)
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'extractedData': extracted_data,
                'rawText': ocr_result
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }


def recognize_text_yandex(image_base64: str, api_key: str) -> Optional[str]:
    '''Распознаёт текст через Yandex Vision OCR'''
    try:
        url = 'https://ocr.api.cloud.yandex.net/ocr/v1/recognizeText'
        
        headers = {
            'Authorization': f'Api-Key {api_key}',
            'Content-Type': 'application/json'
        }
        
        payload = {
            'mimeType': 'image/jpeg',
            'languageCodes': ['ru', 'en'],
            'content': image_base64
        }
        
        response = requests.post(url, headers=headers, json=payload, timeout=30)
        
        if response.status_code != 200:
            return None
        
        result = response.json()
        
        text_blocks = []
        if 'result' in result and 'textAnnotation' in result['result']:
            for block in result['result']['textAnnotation'].get('blocks', []):
                for line in block.get('lines', []):
                    line_text = ' '.join([word['text'] for word in line.get('words', [])])
                    text_blocks.append(line_text)
        
        return '\n'.join(text_blocks)
        
    except Exception:
        return None


def extract_financial_data(text: str) -> Dict:
    '''Извлекает финансовые данные из распознанного текста'''
    data = {
        'amounts': [],
        'dates': [],
        'documentNumber': None,
        'documentType': None,
        'inn': None,
        'totalAmount': None
    }
    
    amount_patterns = [
        r'(?:итого|сумма|к оплате|всего)[:\s]*(\d+[\s,]?\d*[.,]?\d*)\s*(?:руб|₽)?',
        r'(\d+[\s,]?\d*[.,]\d{2})\s*(?:руб|₽)',
        r'(?:^|\s)(\d{1,3}(?:[\s,]\d{3})*(?:[.,]\d{2})?)\s*(?:руб|₽)',
    ]
    
    for pattern in amount_patterns:
        matches = re.finditer(pattern, text, re.IGNORECASE | re.MULTILINE)
        for match in matches:
            amount_str = match.group(1).replace(' ', '').replace(',', '')
            try:
                amount = float(amount_str.replace(',', '.'))
                if amount > 0:
                    data['amounts'].append(amount)
            except ValueError:
                pass
    
    date_patterns = [
        r'(\d{2}[./-]\d{2}[./-]\d{4})',
        r'(\d{2}\.\d{2}\.\d{2})',
        r'(?:от|дата)[:\s]*(\d{2}[./-]\d{2}[./-]\d{2,4})',
    ]
    
    for pattern in date_patterns:
        matches = re.finditer(pattern, text, re.IGNORECASE)
        for match in matches:
            data['dates'].append(match.group(1))
    
    doc_number_match = re.search(r'(?:№|номер|счет)[:\s#]*(\d+(?:[/-]\d+)?)', text, re.IGNORECASE)
    if doc_number_match:
        data['documentNumber'] = doc_number_match.group(1)
    
    if re.search(r'счет[- ]фактура', text, re.IGNORECASE):
        data['documentType'] = 'Счёт-фактура'
    elif re.search(r'акт', text, re.IGNORECASE):
        data['documentType'] = 'Акт'
    elif re.search(r'счет', text, re.IGNORECASE):
        data['documentType'] = 'Счёт'
    elif re.search(r'накладн', text, re.IGNORECASE):
        data['documentType'] = 'Накладная'
    
    inn_match = re.search(r'ИНН[:\s]*(\d{10,12})', text, re.IGNORECASE)
    if inn_match:
        data['inn'] = inn_match.group(1)
    
    if data['amounts']:
        data['totalAmount'] = max(data['amounts'])
    
    return data