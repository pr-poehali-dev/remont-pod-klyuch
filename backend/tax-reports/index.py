"""API для управления календарём налоговых отчётов"""
import json
import os
from datetime import datetime
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

def handler(event: dict, context) -> dict:
    """API для календаря налоговых отчётов"""
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
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
            
            report_type = data.get('report_type', 'other')
            title = data.get('title', '').strip()
            due_date = data.get('due_date')
            frequency = data.get('frequency', 'one_time')
            reminder_days = data.get('reminder_days', 7)
            
            if not title or not due_date:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Title and due_date are required'}),
                    'isBase64Encoded': False
                }
            
            cur.execute("""
                INSERT INTO tax_reports_calendar 
                (user_id, report_type, title, due_date, frequency, status, reminder_days, created_at)
                VALUES (%s, %s, %s, %s, %s, 'upcoming', %s, CURRENT_TIMESTAMP)
                RETURNING id, user_id, report_type, title, due_date, frequency, status, reminder_days, created_at
            """, (user_id, report_type, title, due_date, frequency, reminder_days))
            
            result = dict(cur.fetchone())
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(result, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'GET':
            params = event.get('queryStringParameters', {})
            from_date = params.get('from_date')
            to_date = params.get('to_date')
            status = params.get('status')
            
            query = """
                SELECT id, user_id, report_type, title, due_date, frequency, 
                       status, reminder_days, submitted_at, created_at,
                       EXTRACT(DAY FROM (due_date - CURRENT_DATE))::INTEGER as days_until_due
                FROM tax_reports_calendar
                WHERE user_id = %s
            """
            query_params = [user_id]
            
            if from_date:
                query += " AND due_date >= %s"
                query_params.append(from_date)
            
            if to_date:
                query += " AND due_date <= %s"
                query_params.append(to_date)
            
            if status:
                query += " AND status = %s"
                query_params.append(status)
            
            query += " ORDER BY due_date ASC"
            
            cur.execute(query, query_params)
            
            reports = [dict(row) for row in cur.fetchall()]
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(reports, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            params = event.get('queryStringParameters', {})
            report_id = params.get('id')
            
            if not report_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Report ID is required'}),
                    'isBase64Encoded': False
                }
            
            data = json.loads(event.get('body', '{}'))
            
            update_fields = []
            update_values = []
            
            if 'status' in data:
                update_fields.append('status = %s')
                update_values.append(data['status'])
                if data['status'] == 'submitted':
                    update_fields.append('submitted_at = CURRENT_TIMESTAMP')
            
            if 'due_date' in data:
                update_fields.append('due_date = %s')
                update_values.append(data['due_date'])
            
            if 'reminder_days' in data:
                update_fields.append('reminder_days = %s')
                update_values.append(data['reminder_days'])
            
            if not update_fields:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'No fields to update'}),
                    'isBase64Encoded': False
                }
            
            update_values.extend([report_id, user_id])
            
            cur.execute(f"""
                UPDATE tax_reports_calendar
                SET {', '.join(update_fields)}
                WHERE id = %s AND user_id = %s
                RETURNING id, user_id, report_type, title, due_date, frequency, status, reminder_days, submitted_at, created_at
            """, update_values)
            
            result = cur.fetchone()
            
            if not result:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Report not found'}),
                    'isBase64Encoded': False
                }
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(dict(result), default=str),
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
