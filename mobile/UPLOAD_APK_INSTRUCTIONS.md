# Как загрузить готовый APK в облако

После сборки APK через EAS Build, загрузите его в S3, чтобы пользователи могли скачать через кнопку на сайте.

## Вариант 1: Через AWS CLI (рекомендуется)

### Установите AWS CLI:
```bash
# macOS
brew install awscli

# Windows
# Скачайте с https://aws.amazon.com/cli/

# Linux
sudo apt install awscli
```

### Настройте доступ:
```bash
aws configure --profile poehali
```

Введите:
- AWS Access Key ID: `[ваш AWS_ACCESS_KEY_ID из secrets]`
- AWS Secret Access Key: `[ваш AWS_SECRET_ACCESS_KEY из secrets]`
- Default region: `ru-central1`
- Default output format: `json`

### Загрузите APK:
```bash
aws s3 cp remont-pod-klyuch.apk \
  s3://files/mobile/remont-pod-klyuch.apk \
  --endpoint-url https://bucket.poehali.dev \
  --profile poehali \
  --content-type application/vnd.android.package-archive
```

## Вариант 2: Через Python скрипт

Создайте файл `upload_apk.py`:

```python
import boto3
import os

# Получите ключи из переменных окружения или вставьте напрямую
AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')

s3 = boto3.client('s3',
    endpoint_url='https://bucket.poehali.dev',
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY
)

# Путь к вашему APK файлу
apk_path = 'remont-pod-klyuch.apk'

with open(apk_path, 'rb') as f:
    s3.put_object(
        Bucket='files',
        Key='mobile/remont-pod-klyuch.apk',
        Body=f,
        ContentType='application/vnd.android.package-archive'
    )

print("✅ APK успешно загружен!")
print(f"📱 Скачать можно по ссылке:")
print(f"https://cdn.poehali.dev/projects/{AWS_ACCESS_KEY_ID}/bucket/mobile/remont-pod-klyuch.apk")
```

Запустите:
```bash
python upload_apk.py
```

## Вариант 3: Через веб-интерфейс S3

1. Откройте https://bucket.poehali.dev
2. Войдите с вашими AWS ключами
3. Создайте папку `mobile/`
4. Загрузите файл `remont-pod-klyuch.apk`
5. Установите Content-Type: `application/vnd.android.package-archive`

## Проверка загрузки

После загрузки проверьте доступность:

```bash
curl -I https://cdn.poehali.dev/projects/[AWS_ACCESS_KEY_ID]/bucket/mobile/remont-pod-klyuch.apk
```

Должен вернуться статус `200 OK`.

## Автоматическая загрузка после сборки

Добавьте в workflow EAS Build автоматическую загрузку:

```yaml
# .github/workflows/build-apk.yml
name: Build and Upload APK

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install dependencies
        run: cd mobile && npm install
      
      - name: Build APK
        run: |
          cd mobile
          npx eas-cli@latest build --platform android --profile preview --non-interactive
      
      - name: Upload to S3
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          aws s3 cp mobile/remont-pod-klyuch.apk \
            s3://files/mobile/remont-pod-klyuch.apk \
            --endpoint-url https://bucket.poehali.dev
```

## Обновление версии

При обновлении приложения:
1. Измените `version` в `mobile/app.json`
2. Соберите новый APK
3. Загрузите с тем же именем (старый перезапишется)
4. Пользователи автоматически получат новую версию при скачивании
