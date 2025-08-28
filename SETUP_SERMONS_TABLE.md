# Setup Sermons Table in Supabase

## Quick Setup Instructions

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/ieswjwpekpkflsswvree

2. Click on "SQL Editor" in the left sidebar

3. Copy and paste this entire SQL code:

```sql
-- Create sermons table
CREATE TABLE IF NOT EXISTS sermons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  speaker VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  scripture VARCHAR(100),
  description TEXT,
  audio_url TEXT,
  duration VARCHAR(20),
  sermon_type VARCHAR(50) DEFAULT 'regular',
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes
CREATE INDEX idx_sermons_date ON sermons(date DESC);
CREATE INDEX idx_sermons_published ON sermons(is_published);
CREATE INDEX idx_sermons_type ON sermons(sermon_type);

-- Enable Row Level Security
ALTER TABLE sermons ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view published sermons" ON sermons
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Service role full access" ON sermons
  FOR ALL
  USING (true);
```

4. Click "Run" to execute the SQL

5. You should see "Success. No rows returned" message

## Verify Installation

After running the SQL, go to "Table Editor" in the sidebar and you should see a "sermons" table.

## Upload Sermons

Once the table is created:
1. Go to `/admin/sermons` on your website
2. Log in with your admin credentials
3. Click "Add New Sermon" to upload sermons with audio files