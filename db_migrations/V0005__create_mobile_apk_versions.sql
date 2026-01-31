-- Таблица для хранения текущего APK файла
CREATE TABLE IF NOT EXISTS t_p37682378_remont_pod_klyuch.mobile_apk_versions (
    id SERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    download_url TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Индекс для быстрого поиска активной версии
CREATE INDEX idx_mobile_apk_active ON t_p37682378_remont_pod_klyuch.mobile_apk_versions(is_active) WHERE is_active = true;