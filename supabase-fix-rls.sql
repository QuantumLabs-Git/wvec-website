-- Temporarily disable RLS to test if that's the issue
-- Run this in Supabase SQL Editor

-- Disable RLS on events table
ALTER TABLE events DISABLE ROW LEVEL SECURITY;

-- Disable RLS on articles table  
ALTER TABLE articles DISABLE ROW LEVEL SECURITY;

-- Disable RLS on page_content table
ALTER TABLE page_content DISABLE ROW LEVEL SECURITY;

-- Note: This makes all data publicly accessible
-- Only use for testing, then re-enable with:
-- ALTER TABLE events ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;