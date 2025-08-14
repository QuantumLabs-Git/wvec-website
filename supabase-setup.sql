-- WVEC Website Database Schema for Supabase
-- Run this in the Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  author TEXT,
  tags TEXT[],
  featured_image TEXT,
  is_published BOOLEAN DEFAULT false,
  slug TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Page content table
CREATE TABLE IF NOT EXISTS page_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_name TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_published ON events(is_published);
CREATE INDEX idx_articles_published ON articles(is_published);
CREATE INDEX idx_articles_slug ON articles(slug);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to update the updated_at column
CREATE TRIGGER events_updated_at BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER articles_updated_at BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER page_content_updated_at BEFORE UPDATE ON page_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Insert default weekly events
INSERT INTO events (title, description, date, time, location, category, is_published)
VALUES 
  (
    'Sunday Morning Service',
    'Join us for worship and the preaching of God''s Word from the King James Bible',
    CURRENT_DATE + (7 - EXTRACT(DOW FROM CURRENT_DATE))::INTEGER % 7,
    '11:00 AM',
    'Whiddon Valley Evangelical Church',
    'service',
    true
  ),
  (
    'Sunday Evening Service',
    'Evening worship and Bible teaching',
    CURRENT_DATE + (7 - EXTRACT(DOW FROM CURRENT_DATE))::INTEGER % 7,
    '6:00 PM',
    'Whiddon Valley Evangelical Church',
    'service',
    true
  ),
  (
    'Thursday Bible Study',
    'In-depth study of Scripture with Pastor',
    CURRENT_DATE + (4 - EXTRACT(DOW FROM CURRENT_DATE) + 7)::INTEGER % 7,
    '10:30 AM',
    'Whiddon Valley Evangelical Church',
    'study',
    true
  );

-- Insert default page content
INSERT INTO page_content (page_name, content)
VALUES 
  (
    'homepage',
    '{
      "hero": {
        "title": "Reformed Baptist Church in Barnstaple, North Devon",
        "subtitle": "KJV Bible Preaching | Traditional Hymns | 1689 Baptist Confession"
      },
      "welcome": {
        "title": "Welcome to Whiddon Valley Evangelical Church",
        "content": "We are a Reformed Baptist church located in Barnstaple, North Devon, committed to the faithful preaching of God''s Word from the King James Bible."
      }
    }'::jsonb
  ),
  (
    'about',
    '{
      "mission": "To glorify God by proclaiming the Gospel of Jesus Christ and making disciples through the faithful preaching and teaching of God''s Word.",
      "values": ["Sola Scriptura", "Sola Gratia", "Sola Fide", "Solus Christus", "Soli Deo Gloria"]
    }'::jsonb
  );

-- Create RLS (Row Level Security) policies
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published items
CREATE POLICY "Public can view published events" ON events
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public can view published articles" ON articles
  FOR SELECT USING (is_published = true);

CREATE POLICY "Public can view page content" ON page_content
  FOR SELECT USING (true);

-- For admin access, we'll use service role key which bypasses RLS
-- This ensures only authenticated admin requests can modify data

GRANT ALL ON events TO authenticated;
GRANT ALL ON articles TO authenticated;
GRANT ALL ON page_content TO authenticated;
GRANT ALL ON events TO service_role;
GRANT ALL ON articles TO service_role;
GRANT ALL ON page_content TO service_role;