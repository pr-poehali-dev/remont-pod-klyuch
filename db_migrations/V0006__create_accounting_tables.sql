-- Создание таблицы для хранения метаданных документов
CREATE TABLE IF NOT EXISTS accounting_documents (
    id SERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    file_size INTEGER,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending',
    processed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы для хранения финансовых транзакций
CREATE TABLE IF NOT EXISTS accounting_transactions (
    id SERIAL PRIMARY KEY,
    transaction_type VARCHAR(50) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'RUB',
    description TEXT,
    category VARCHAR(100),
    transaction_date DATE NOT NULL,
    document_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы для хранения налоговых событий
CREATE TABLE IF NOT EXISTS accounting_tax_events (
    id SERIAL PRIMARY KEY,
    tax_name VARCHAR(100) NOT NULL,
    amount DECIMAL(15, 2) DEFAULT 0,
    deadline_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    paid_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для оптимизации запросов
CREATE INDEX IF NOT EXISTS idx_documents_uploaded_at ON accounting_documents(uploaded_at);
CREATE INDEX IF NOT EXISTS idx_documents_status ON accounting_documents(status);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON accounting_transactions(transaction_date);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON accounting_transactions(transaction_type);
CREATE INDEX IF NOT EXISTS idx_tax_events_deadline ON accounting_tax_events(deadline_date);
CREATE INDEX IF NOT EXISTS idx_tax_events_status ON accounting_tax_events(status);