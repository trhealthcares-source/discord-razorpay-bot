-- Users subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  role_id TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  start_at INTEGER NOT NULL,
  expire_at INTEGER NOT NULL,
  status TEXT NOT NULL
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  role_id TEXT NOT NULL,
  amount_paise INTEGER NOT NULL,
  payment_id TEXT NOT NULL,
  invoice_id TEXT,
  created_at INTEGER NOT NULL
);

-- Admin action logs
CREATE TABLE IF NOT EXISTS admin_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  admin_id TEXT NOT NULL,
  action TEXT NOT NULL,
  target_user_id TEXT,
  role_id TEXT,
  details TEXT,
  created_at INTEGER NOT NULL
);

-- Plan updates (for !updateplan)
CREATE TABLE IF NOT EXISTS plans (
  role_id TEXT PRIMARY KEY,
  plan_name TEXT NOT NULL,
  price_paise INTEGER NOT NULL,
  duration_days INTEGER NOT NULL
);
