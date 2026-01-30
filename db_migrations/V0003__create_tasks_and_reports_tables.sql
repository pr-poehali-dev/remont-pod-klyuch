-- Таблица задач для бухгалтера
CREATE TABLE IF NOT EXISTS accountant_tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    task_type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    priority VARCHAR(20) DEFAULT 'medium',
    due_date TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Таблица календаря отчётов в ФНС
CREATE TABLE IF NOT EXISTS tax_reports_calendar (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    report_type VARCHAR(100) NOT NULL,
    report_name VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE NOT NULL,
    frequency VARCHAR(50),
    status VARCHAR(50) NOT NULL DEFAULT 'upcoming',
    submitted_at TIMESTAMP,
    reminder_days INTEGER DEFAULT 7,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_accountant_tasks_user_id ON accountant_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_accountant_tasks_status ON accountant_tasks(status);
CREATE INDEX IF NOT EXISTS idx_accountant_tasks_due_date ON accountant_tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tax_reports_user_id ON tax_reports_calendar(user_id);
CREATE INDEX IF NOT EXISTS idx_tax_reports_due_date ON tax_reports_calendar(due_date);
CREATE INDEX IF NOT EXISTS idx_tax_reports_status ON tax_reports_calendar(status);