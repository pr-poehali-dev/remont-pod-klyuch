# Инструкция по сборке APK

## Шаг 1: Установите EAS CLI

```bash
npm install -g eas-cli
```

Или используйте npx (без установки):
```bash
npx eas-cli@latest --version
```

## Шаг 2: Войдите в Expo аккаунт

```bash
npx eas-cli@latest login
```

Если у вас нет аккаунта:
1. Перейдите на https://expo.dev
2. Нажмите "Sign Up"
3. Зарегистрируйтесь через GitHub, Google или email

## Шаг 3: Создайте проект в Expo

```bash
cd mobile
npx eas-cli@latest build:configure
```

Команда выполнит:
- Создаст `eas.json` (уже готов!)
- Спросит: "Would you like to create a project?" → **Yes**
- Автоматически обновит `app.json` с вашим Expo username и projectId

## Шаг 4: Соберите APK

```bash
npx eas-cli@latest build --platform android --profile preview
```

Процесс:
1. Загрузка кода на серверы Expo
2. Установка зависимостей
3. Сборка APK (займёт 5-10 минут)
4. Вы получите ссылку для скачивания

## Шаг 5: Скачайте APK

После завершения сборки:
1. Откройте ссылку из терминала на телефоне
2. Или перейдите на https://expo.dev/accounts/[ваш-username]/projects/remont-pod-klyuch/builds
3. Скачайте APK-файл
4. Установите на Android-устройство

## Возможные проблемы

### Ошибка "Project not found"
Выполните:
```bash
npx eas-cli@latest init
```

### Ошибка авторизации
Проверьте логин:
```bash
npx eas-cli@latest whoami
```

Перелогиньтесь:
```bash
npx eas-cli@latest logout
npx eas-cli@latest login
```

### Нужны иконки приложения

Создайте в папке `mobile/assets/`:
- `icon.png` - 1024x1024px (иконка приложения)
- `adaptive-icon.png` - 1024x1024px (Android adaptive icon)
- `splash.png` - 1284x2778px (splash screen)
- `favicon.png` - 48x48px (веб-иконка)
- `notification-icon.png` - 96x96px (иконка уведомлений)

Или используйте генератор иконок:
https://www.appicon.co/

## Полезные команды

Проверить статус сборки:
```bash
npx eas-cli@latest build:list
```

Посмотреть детали сборки:
```bash
npx eas-cli@latest build:view
```

Собрать для iOS (требуется Apple Developer аккаунт $99/год):
```bash
npx eas-cli@latest build --platform ios --profile preview
```

## Готово!

После сборки APK-файл можно:
- Установить на любой Android-телефон (Android 8.0+)
- Распространять через сайт или Telegram
- Опубликовать в Google Play Store (требуется аккаунт разработчика $25 единоразово)
