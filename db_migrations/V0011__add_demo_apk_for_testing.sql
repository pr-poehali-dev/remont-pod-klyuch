-- Добавляем временную тестовую запись для демонстрации работы кнопки скачивания
INSERT INTO mobile_apk_versions (file_name, download_url, is_active) 
VALUES (
  'remont-pod-klyuch-demo.apk', 
  'https://cdn.poehali.dev/demo/mobile/remont-pod-klyuch-demo.apk', 
  true
);