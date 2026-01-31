"""API для управления задачами бухгалтера"""
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
    """API для работы с задачами"""
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
            
            task_type = data.get('task_type', 'other')
            title = data.get('title', '').strip()
            description = data.get('description', '').strip()
            priority = data.get('priority', 'medium')
            due_date = data.get('due_date')
            
            if not title:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Title is required'}),
                    'isBase64Encoded': False
                }
            
            cur.execute("""
                INSERT INTO accountant_tasks 
                (user_id, task_type, title, description, priority, status, due_date, created_at)
                VALUES (%s, %s, %s, %s, %s, 'pending', %s, CURRENT_TIMESTAMP)
                RETURNING id, user_id, task_type, title, description, priority, status, due_date, created_at
            """, (user_id, task_type, title, description, priority, due_date))
            
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
            status = params.get('status')
            limit = int(params.get('limit', 50))
            offset = int(params.get('offset', 0))
            
            query = """
                SELECT id, user_id, task_type, title, description, priority, status, 
                       due_date, created_at, completed_at
                FROM accountant_tasks
                WHERE user_id = %s
            """
            query_params = [user_id]
            
            if status:
                query += " AND status = %s"
                query_params.append(status)
            
            query += " ORDER BY created_at DESC LIMIT %s OFFSET %s"
            query_params.extend([limit, offset])
            
            cur.execute(query, query_params)
            
            tasks = [dict(row) for row in cur.fetchall()]
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(tasks, default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            params = event.get('queryStringParameters', {})
            task_id = params.get('id')
            
            if not task_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Task ID is required'}),
                    'isBase64Encoded': False
                }
            
            data = json.loads(event.get('body', '{}'))
            
            update_fields = []
            update_values = []
            
            if 'status' in data:
                update_fields.append('status = %s')
                update_values.append(data['status'])
                if data['status'] == 'completed':
                    update_fields.append('completed_at = CURRENT_TIMESTAMP')
            
            if 'description' in data:
                update_fields.append('description = %s')
                update_values.append(data['description'])
            
            if 'priority' in data:
                update_fields.append('priority = %s')
                update_values.append(data['priority'])
            
            if 'due_date' in data:
                update_fields.append('due_date = %s')
                update_values.append(data['due_date'])
            
            if not update_fields:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'No fields to update'}),
                    'isBase64Encoded': False
                }
            
            update_values.extend([task_id, user_id])
            
            cur.execute(f"""
                UPDATE accountant_tasks
                SET {', '.join(update_fields)}
                WHERE id = %s AND user_id = %s
                RETURNING id, user_id, task_type, title, description, priority, status, due_date, created_at, completed_at
            """, update_values)
            
            result = cur.fetchone()
            
            if not result:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Task not found'}),
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
