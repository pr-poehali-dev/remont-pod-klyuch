-- Таблица бухгалтеров
CREATE TABLE IF NOT EXISTS accountants (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    full_name VARCHAR(255) NOT NULL,
    specialization VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255),
    max_clients INTEGER DEFAULT 10,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Таблица связи клиент-бухгалтер
CREATE TABLE IF NOT EXISTS client_accountant_assignments (
    id SERIAL PRIMARY KEY,
    client_user_id INTEGER NOT NULL REFERENCES users(id),
    accountant_id INTEGER NOT NULL REFERENCES accountants(id),
    assigned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    UNIQUE(client_user_id)
);

-- Таблица истории чата с AI-агентом
CREATE TABLE IF NOT EXISTS ai_chat_messages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    role VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Таблица действий AI-агента (что он сделал)
CREATE TABLE IF NOT EXISTS ai_agent_actions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    action_type VARCHAR(100) NOT NULL,
    action_data JSONB,
    task_id INTEGER REFERENCES accountant_tasks(id),
    document_id INTEGER REFERENCES accounting_documents(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Таблица кодов активации для мобильного приложения
CREATE TABLE IF NOT EXISTS activation_codes (
    id SERIAL PRIMARY KEY,
    code VARCHAR(12) NOT NULL UNIQUE,
    user_id INTEGER REFERENCES users(id),
    used_at TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Индексы
CREATE INDEX IF NOT EXISTS idx_accountants_user_id ON accountants(user_id);
CREATE INDEX IF NOT EXISTS idx_client_accountant_client ON client_accountant_assignments(client_user_id);
CREATE INDEX IF NOT EXISTS idx_client_accountant_accountant ON client_accountant_assignments(accountant_id);
CREATE INDEX IF NOT EXISTS idx_ai_chat_user ON ai_chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_chat_created ON ai_chat_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_ai_actions_user ON ai_agent_actions(user_id);
CREATE INDEX IF NOT EXISTS idx_activation_codes_code ON activation_codes(code);
CREATE INDEX IF NOT EXISTS idx_activation_codes_user ON activation_codes(user_id);