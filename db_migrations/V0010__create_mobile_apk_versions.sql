-- Таблица для хранения текущего APK файла
CREATE TABLE IF NOT EXISTS mobile_apk_versions (
    id SERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    download_url TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Индекс для быстрого поиска активной версии
CREATE INDEX IF NOT EXISTS idx_mobile_apk_active ON mobile_apk_versions(is_active) WHERE is_active = true;