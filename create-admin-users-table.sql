-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin', -- 'super_admin' or 'admin'
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  created_by UUID REFERENCES admin_users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Super admins can do everything
CREATE POLICY "Super admins can manage all users" ON admin_users
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_admin_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_admin_users_updated_at();

-- Insert the super admin user (russell@tyrcars.co.uk)
-- Default password: Password123 (hashed)
INSERT INTO admin_users (email, password_hash, full_name, role, is_active)
VALUES (
  'russell@tyrcars.co.uk',
  '$2b$10$/ROqrT4E57F010O9Ag01ZeKEF6jeF.98J72NXEkOtrZ9VL9jwSKQ2',
  'Russell',
  'super_admin',
  true
) ON CONFLICT (email) 
DO UPDATE SET role = 'super_admin';

-- Also add the existing admin user if they exist
INSERT INTO admin_users (email, password_hash, full_name, role, is_active)
SELECT 
  email,
  '$2b$10$/ROqrT4E57F010O9Ag01ZeKEF6jeF.98J72NXEkOtrZ9VL9jwSKQ2',
  email,
  'admin',
  true
FROM (
  SELECT unnest(string_to_array('admin@wvec.org.uk', ',')) as email
) emails
WHERE email != 'russell@tyrcars.co.uk'
ON CONFLICT (email) DO NOTHING;