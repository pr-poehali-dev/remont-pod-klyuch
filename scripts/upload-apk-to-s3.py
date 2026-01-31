#!/usr/bin/env python3
"""
Скрипт для загрузки готового APK файла мобильного приложения в S3 хранилище.

Использование:
1. Соберите APK: cd mobile-app/android && ./gradlew assembleRelease
2. Запустите скрипт: python scripts/upload-apk-to-s3.py
"""

import os
import sys
import boto3
from botocore.exceptions import ClientError, NoCredentialsError
from pathlib import Path

def find_apk_file():
    """
    Поиск APK файла в стандартных местах.
    """
    possible_paths = [
        'remont-pod-klyuch.apk',
        'mobile-app/android/app/build/outputs/apk/release/app-release.apk',
        'android/app/build/outputs/apk/release/app-release.apk',
    ]
    
    for path in possible_paths:
        if os.path.exists(path):
            return path
    
    return None

def get_file_size_mb(file_path):
    """
    Получить размер файла в МБ.
    """
    size_bytes = os.path.getsize(file_path)
    return size_bytes / (1024 * 1024)

def upload_apk_to_s3(apk_path):
    """
    Загрузка APK файла в S3 bucket.
    """
    print("=" * 70)
    print("📱 Загрузка APK мобильного приложения в S3")
    print("=" * 70)
    
    # Проверка наличия файла
    if not os.path.exists(apk_path):
        print(f"❌ Ошибка: Файл не найден: {apk_path}")
        return False
    
    file_size = get_file_size_mb(apk_path)
    print(f"\n📦 Найден APK: {apk_path}")
    print(f"   Размер: {file_size:.2f} МБ")
    
    # Проверка размера
    if file_size > 100:
        print(f"⚠️  Предупреждение: APK файл очень большой ({file_size:.2f} МБ)")
        print("   Рекомендуется оптимизировать сборку (ProGuard, shrinkResources)")
    
    # Получение AWS credentials
    aws_access_key = os.environ.get('AWS_ACCESS_KEY_ID')
    aws_secret_key = os.environ.get('AWS_SECRET_ACCESS_KEY')
    
    if not aws_access_key or not aws_secret_key:
        print("\n❌ Ошибка: AWS credentials не найдены")
        print("   Установите переменные окружения:")
        print("   - AWS_ACCESS_KEY_ID")
        print("   - AWS_SECRET_ACCESS_KEY")
        return False
    
    # Конфигурация S3
    BUCKET_NAME = 'files'
    OBJECT_KEY = 'mobile/remont-pod-klyuch.apk'
    ENDPOINT_URL = 'https://bucket.poehali.dev'
    
    print(f"\n☁️  Загрузка в S3...")
    print(f"   Endpoint: {ENDPOINT_URL}")
    print(f"   Bucket: {BUCKET_NAME}")
    print(f"   Key: {OBJECT_KEY}")
    
    try:
        # Инициализация S3 клиента
        s3_client = boto3.client(
            's3',
            endpoint_url=ENDPOINT_URL,
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_key
        )
        
        # Загрузка файла с progress
        print("\n⏳ Загрузка... (это может занять несколько минут)")
        
        with open(apk_path, 'rb') as file_data:
            s3_client.put_object(
                Bucket=BUCKET_NAME,
                Key=OBJECT_KEY,
                Body=file_data,
                ContentType='application/vnd.android.package-archive',
                ContentDisposition='attachment; filename="remont-pod-klyuch.apk"',
            )
        
        # Формирование CDN URL
        cdn_url = f"https://cdn.poehali.dev/projects/{aws_access_key}/bucket/{OBJECT_KEY}"
        
        print("\n" + "=" * 70)
        print("✅ APK успешно загружен в S3!")
        print("=" * 70)
        print(f"\n🌐 Публичный URL для скачивания:")
        print(f"   {cdn_url}")
        print(f"\n📱 Теперь пользователи могут скачать приложение с сайта!")
        print(f"   Страница загрузки: https://your-site.com/mobile-app")
        print("\n💡 Что дальше:")
        print("   1. Откройте сайт и проверьте кнопку 'Скачать APK'")
        print("   2. Протестируйте установку на Android устройстве")
        print("   3. Проверьте активацию кода в приложении")
        
        return True
        
    except NoCredentialsError:
        print("\n❌ Ошибка: Неверные AWS credentials")
        return False
    except ClientError as e:
        error_code = e.response['Error']['Code']
        error_message = e.response['Error']['Message']
        print(f"\n❌ S3 Client Error: {error_code}")
        print(f"   {error_message}")
        return False
    except Exception as e:
        print(f"\n❌ Неожиданная ошибка: {e}")
        return False

def main():
    """
    Основная функция скрипта.
    """
    # Поиск APK файла
    print("\n🔍 Поиск APK файла...")
    apk_path = find_apk_file()
    
    if not apk_path:
        print("\n❌ APK файл не найден!")
        print("\n📝 Инструкция по сборке APK:")
        print("   1. cd mobile-app")
        print("   2. npm install")
        print("   3. cd android")
        print("   4. ./gradlew assembleRelease")
        print("   5. Найдите APK в: android/app/build/outputs/apk/release/app-release.apk")
        print("\n   Или скопируйте готовый APK в корень проекта с именем: remont-pod-klyuch.apk")
        print("\n📖 Подробная инструкция: mobile-app/BUILD_GUIDE.md")
        sys.exit(1)
    
    # Загрузка APK
    success = upload_apk_to_s3(apk_path)
    
    if not success:
        print("\n" + "=" * 70)
        print("❌ Загрузка не удалась")
        print("=" * 70)
        sys.exit(1)
    
    print("\n" + "=" * 70)

if __name__ == '__main__':
    main()
