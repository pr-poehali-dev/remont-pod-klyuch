-- Добавляем колонку phone в users для использования как логина
ALTER TABLE t_p37682378_remont_pod_klyuch.users ADD COLUMN IF NOT EXISTS phone VARCHAR(20) UNIQUE;

-- Индекс для быстрого поиска по телефону
CREATE INDEX IF NOT EXISTS idx_users_phone ON t_p37682378_remont_pod_klyuch.users(phone);