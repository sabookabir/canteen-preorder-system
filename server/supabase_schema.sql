-- ============================================================
-- Canteen Pre-Order System — Supabase SQL Schema
-- Run this entire script in your Supabase SQL Editor
-- Project Dashboard -> SQL Editor -> New Query -> Paste & Run
-- ============================================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student' 
    CHECK (role IN ('student', 'staff', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL 
    CHECK (category IN ('Breakfast', 'Lunch', 'Snacks', 'Drinks')),
  price NUMERIC NOT NULL,
  image_url TEXT,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Orders Table (order_items stored as JSONB array)
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_items JSONB NOT NULL,
  total NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending'
    CHECK (status IN ('Pending', 'Preparing', 'Ready', 'Picked Up')),
  pickup_time TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Support Tickets Table
CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL 
    CHECK (type IN ('Feedback', 'Bug Report', 'General Inquiry')),
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Open' 
    CHECK (status IN ('Open', 'In Progress', 'Resolved', 'Closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Disable Row Level Security (RLS) so our backend key has access
-- ============================================================
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets DISABLE ROW LEVEL SECURITY;

-- ============================================================
-- Optional: Seed some starter menu items
-- ============================================================
INSERT INTO menu_items (name, category, price, available) VALUES
  ('Masala Dosa', 'Breakfast', 40, true),
  ('Idli Sambar', 'Breakfast', 30, true),
  ('Veg Thali', 'Lunch', 70, true),
  ('Chicken Biryani', 'Lunch', 90, true),
  ('Samosa', 'Snacks', 15, true),
  ('Masala Chai', 'Drinks', 10, true),
  ('Cold Coffee', 'Drinks', 40, true),
  ('Sandwich', 'Snacks', 35, true)
ON CONFLICT DO NOTHING;

SELECT 'Schema created successfully! Tables: users, menu_items, orders, support_tickets' AS status;
