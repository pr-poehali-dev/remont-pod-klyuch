CREATE TABLE IF NOT EXISTS t_p37682378_remont_pod_klyuch.push_subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    endpoint TEXT NOT NULL UNIQUE,
    p256dh TEXT NOT NULL,
    auth TEXT NOT NULL,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_push_subscriptions_user_id ON t_p37682378_remont_pod_klyuch.push_subscriptions(user_id);

CREATE TABLE IF NOT EXISTS t_p37682378_remont_pod_klyuch.push_notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    notification_type VARCHAR(50),
    data JSONB,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'sent'
);

CREATE INDEX IF NOT EXISTS idx_push_notifications_user_id ON t_p37682378_remont_pod_klyuch.push_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_push_notifications_type ON t_p37682378_remont_pod_klyuch.push_notifications(notification_type);