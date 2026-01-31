# 📱 Инструкция по сборке APK для Android

Пошаговое руководство для создания готового APK-файла мобильного приложения БухКонтроль.

## ⚠️ Предварительные требования

### 1. Установите необходимое ПО

- **Node.js 18+**: https://nodejs.org/
- **Android Studio**: https://developer.android.com/studio
- **JDK 17**: Обычно устанавливается вместе с Android Studio

### 2. Настройка Android Studio

1. Откройте Android Studio
2. Tools → SDK Manager
3. Установите:
   - Android SDK Platform 33
   - Android SDK Build-Tools 33.0.0
   - Android SDK Platform-Tools

### 3. Переменные окружения

Добавьте в `.bashrc` / `.zshrc` (Mac/Linux) или системные переменные (Windows):

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk  # Mac
# export ANDROID_HOME=$HOME/Android/Sdk        # Linux
# set ANDROID_HOME=C:\Users\<username>\AppData\Local\Android\Sdk  # Windows

export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

## 🔑 Создание ключа подписи (один раз)

### Генерация keystore

```bash
cd mobile-app/android/app

keytool -genkeypair -v \
  -storetype PKCS12 \
  -keystore release.keystore \
  -alias release-key \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

**Важно**: Запомните пароли! Без них вы не сможете обновить приложение в будущем.

### Настройка gradle.properties

Создайте файл `mobile-app/android/gradle.properties`:

```properties
MYAPP_RELEASE_STORE_FILE=release.keystore
MYAPP_RELEASE_KEY_ALIAS=release-key
MYAPP_RELEASE_STORE_PASSWORD=ваш_пароль_хранилища
MYAPP_RELEASE_KEY_PASSWORD=ваш_пароль_ключа
```

**⚠️ ВАЖНО**: Добавьте `gradle.properties` в `.gitignore`!

### Настройка build.gradle

Отредактируйте `mobile-app/android/app/build.gradle`:

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
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

## 🏗️ Процесс сборки

### Шаг 1: Установка зависимостей

```bash
cd mobile-app
npm install
```

### Шаг 2: Очистка предыдущих сборок

```bash
cd android
./gradlew clean
cd ..
```

### Шаг 3: Сборка APK

```bash
cd android
./gradlew assembleRelease
```

Ждите 3-5 минут (первая сборка может занять до 10 минут).

### Шаг 4: Проверка результата

APK находится в:
```
mobile-app/android/app/build/outputs/apk/release/app-release.apk
```

Размер файла: примерно 30-50 МБ

## ✅ Проверка APK

### Установка на устройство

```bash
# Подключите Android устройство по USB
# Включите "Отладка по USB" в настройках

adb install android/app/build/outputs/apk/release/app-release.apk
```

### Тестирование

1. Запустите приложение
2. Введите код активации из личного кабинета
3. Проверьте работу всех экранов

## 📤 Загрузка APK на сервер

### Автоматическая загрузка в S3

```bash
# Из корня проекта (не из mobile-app)
cd ..

# Скопируйте APK
cp mobile-app/android/app/build/outputs/apk/release/app-release.apk ./remont-pod-klyuch.apk

# Загрузите в S3
python scripts/upload-apk-to-s3.py
```

Скрипт:
- Загрузит APK в S3 bucket
- Выведет публичный URL
- Автоматически обновит ссылку на сайте

### Ручная загрузка

Альтернативно можете загрузить через:
- Яндекс.Облако консоль
- AWS S3 консоль
- Cyberduck / FileZilla

Путь в bucket: `mobile/remont-pod-klyuch.apk`

## 🐛 Решение проблем

### Ошибка: "SDK location not found"

```bash
# Создайте файл android/local.properties
echo "sdk.dir=/Users/<username>/Library/Android/sdk" > android/local.properties
```

### Ошибка: "Could not find gradle wrapper"

```bash
cd android
gradle wrapper
./gradlew clean
```

### Ошибка: "Java heap space"

Увеличьте память gradle в `android/gradle.properties`:
```properties
org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=512m
```

### Приложение вылетает при запуске

1. Проверьте правильность подписи keystore
2. Убедитесь что минификация не удалила нужный код
3. Проверьте логи: `adb logcat`

## 📋 Чеклист перед релизом

- [ ] Обновлён `versionCode` в `android/app/build.gradle`
- [ ] Обновлён `versionName` в `android/app/build.gradle`
- [ ] Протестирована активация кода
- [ ] Проверена работа всех экранов
- [ ] Проверены API запросы
- [ ] APK подписан релизным ключом
- [ ] Размер APK оптимизирован (< 50 МБ)
- [ ] Приложение работает на разных версиях Android (8.0+)

## 📊 Мониторинг размера APK

```bash
# Анализ размера APK
./gradlew app:analyzeBundleReleaseSize

# Посмотреть детальную информацию
du -h android/app/build/outputs/apk/release/app-release.apk
```

## 🔄 Обновление приложения

При следующем релизе:

1. Увеличьте `versionCode` в `build.gradle`
2. Обновите `versionName` (например: 1.0.0 → 1.1.0)
3. Повторите процесс сборки
4. Загрузите новый APK на сервер

**Важно**: Используйте тот же keystore! Иначе пользователи не смогут обновиться.

## 📞 Поддержка

Вопросы по сборке: dev@remontpodklyuch.ru
