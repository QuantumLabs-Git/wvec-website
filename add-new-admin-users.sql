-- Add new admin users to the admin_users table
-- All users will have the default password: Password123
-- Password hash: $2b$10$/ROqrT4E57F010O9Ag01ZeKEF6jeF.98J72NXEkOtrZ9VL9jwSKQ2

-- Add David M Jones
INSERT INTO admin_users (email, password_hash, full_name, role, is_active)
VALUES (
  'dmjones3000@gmail.com',
  '$2b$10$/ROqrT4E57F010O9Ag01ZeKEF6jeF.98J72NXEkOtrZ9VL9jwSKQ2',
  'David M Jones',
  'admin',
  true
) ON CONFLICT (email)
DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  updated_at = TIMEZONE('utc', NOW());

-- Add David WVEC
INSERT INTO admin_users (email, password_hash, full_name, role, is_active)
VALUES (
  'davidwvec@gmail.com',
  '$2b$10$/ROqrT4E57F010O9Ag01ZeKEF6jeF.98J72NXEkOtrZ9VL9jwSKQ2',
  'David WVEC',
  'admin',
  true
) ON CONFLICT (email)
DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  updated_at = TIMEZONE('utc', NOW());

-- Add Tom Smith
INSERT INTO admin_users (email, password_hash, full_name, role, is_active)
VALUES (
  'tomsmithnp95@gmail.com',
  '$2b$10$/ROqrT4E57F010O9Ag01ZeKEF6jeF.98J72NXEkOtrZ9VL9jwSKQ2',
  'Tom Smith',
  'admin',
  true
) ON CONFLICT (email)
DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  updated_at = TIMEZONE('utc', NOW());

-- Add Benjamin M Jones
INSERT INTO admin_users (email, password_hash, full_name, role, is_active)
VALUES (
  'benjaminmjones3434@gmail.com',
  '$2b$10$/ROqrT4E57F010O9Ag01ZeKEF6jeF.98J72NXEkOtrZ9VL9jwSKQ2',
  'Benjamin M Jones',
  'admin',
  true
) ON CONFLICT (email)
DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  updated_at = TIMEZONE('utc', NOW());

-- Add Andrew Angela Jones
INSERT INTO admin_users (email, password_hash, full_name, role, is_active)
VALUES (
  'andrewangelajones@gmail.com',
  '$2b$10$/ROqrT4E57F010O9Ag01ZeKEF6jeF.98J72NXEkOtrZ9VL9jwSKQ2',
  'Andrew Angela Jones',
  'admin',
  true
) ON CONFLICT (email)
DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  updated_at = TIMEZONE('utc', NOW());

-- Also ensure the existing admin users are in the database
-- Add pastor@wvec.org.uk
INSERT INTO admin_users (email, password_hash, full_name, role, is_active)
VALUES (
  'pastor@wvec.org.uk',
  '$2b$10$/ROqrT4E57F010O9Ag01ZeKEF6jeF.98J72NXEkOtrZ9VL9jwSKQ2',
  'Pastor',
  'admin',
  true
) ON CONFLICT (email)
DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  updated_at = TIMEZONE('utc', NOW());

-- Add secretary@wvec.org.uk
INSERT INTO admin_users (email, password_hash, full_name, role, is_active)
VALUES (
  'secretary@wvec.org.uk',
  '$2b$10$/ROqrT4E57F010O9Ag01ZeKEF6jeF.98J72NXEkOtrZ9VL9jwSKQ2',
  'Secretary',
  'admin',
  true
) ON CONFLICT (email)
DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  updated_at = TIMEZONE('utc', NOW());

-- Verify all users have been added
SELECT email, full_name, role, is_active, created_at
FROM admin_users
ORDER BY created_at DESC;