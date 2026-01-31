# БухКонтроль - Мобильное приложение

Мобильное приложение для управления бухгалтерией на React Native.

## 🚀 Быстрый старт

### Требования

- Node.js 18+
- React Native CLI
- Android Studio (для Android)
- Xcode (для iOS, только macOS)

### Установка зависимостей

```bash
cd mobile-app
npm install
```

### Запуск в режиме разработки

#### Android
```bash
npm run android
```

#### iOS
```bash
cd ios && pod install && cd ..
npm run ios
```

## 📦 Сборка APK для продакшена

### Шаг 1: Подготовка Android окружения

1. Установите Android Studio
2. Настройте Android SDK (API Level 33+)
3. Создайте keystore для подписи:

```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore release.keystore -alias release-key -keyalg RSA -keysize 2048 -validity 10000
```

### Шаг 2: Настройка gradle

Создайте файл `android/gradle.properties` (если нет) и добавьте:

```properties
MYAPP_RELEASE_STORE_FILE=release.keystore
MYAPP_RELEASE_KEY_ALIAS=release-key
MYAPP_RELEASE_STORE_PASSWORD=ваш_пароль
MYAPP_RELEASE_KEY_PASSWORD=ваш_пароль
```

Отредактируйте `android/app/build.gradle`:

```gradle
android {
    ...
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### Шаг 3: Сборка APK

```bash
cd android
./gradlew assembleRelease
```

APK будет создан в: `android/app/build/outputs/apk/release/app-release.apk`

### Шаг 4: Загрузка на S3

Используйте скрипт из корня проекта:

```bash
# Скопируйте APK в корень проекта
cp android/app/build/outputs/apk/release/app-release.apk ../remont-pod-klyuch.apk

# Загрузите в S3
cd ..
python scripts/upload-apk-to-s3.py
```

## 📱 Функциональность

### Экраны

- **LoginScreen** - Авторизация по коду активации
- **HomeScreen** - Главный экран с статистикой
- **TasksScreen** - Список задач для бухгалтера
- **ReportsScreen** - Календарь налоговых отчётов

### API Интеграция

Приложение подключено к backend API:
- Активация кодов
- Управление задачами
- Календарь отчётов ФНС
- AI-ассистент (в разработке)

## 🔧 Настройка

### Изменение API endpoints

Отредактируйте `src/api/client.ts`:

```typescript
const API_BASE = {
  activation: 'https://your-api.com/activation',
  tasks: 'https://your-api.com/tasks',
  // ...
};
```

### Изменение названия и иконки

1. Название в `android/app/src/main/res/values/strings.xml`
2. Иконка в `android/app/src/main/res/mipmap-*/ic_launcher.png`

## 📄 Структура проекта

```
mobile-app/
├── src/
│   ├── api/
│   │   └── client.ts          # API клиент
│   └── screens/
│       ├── LoginScreen.tsx    # Авторизация
│       ├── HomeScreen.tsx     # Главный экран
│       ├── TasksScreen.tsx    # Задачи
│       └── ReportsScreen.tsx  # Отчёты
├── android/                   # Android проект
├── ios/                       # iOS проект
├── App.tsx                    # Точка входа
└── package.json
```

## 🐛 Отладка

### Android

```bash
# Логи приложения
adb logcat *:S ReactNative:V ReactNativeJS:V

# Очистка кэша
cd android && ./gradlew clean && cd ..
```

### Общие проблемы

1. **Metro bundler не запускается**: `npx react-native start --reset-cache`
2. **Ошибки компиляции Android**: `cd android && ./gradlew clean && cd ..`
3. **Проблемы с зависимостями**: `rm -rf node_modules && npm install`

## 📮 Поддержка

Вопросы и предложения: support@remontpodklyuch.ru
