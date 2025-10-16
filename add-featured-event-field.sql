-- Add is_featured column to events table
ALTER TABLE events
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- Create an index for faster queries on featured events
CREATE INDEX IF NOT EXISTS idx_events_featured
ON events(is_featured, date, time)
WHERE is_featured = true AND is_published = true;

-- Create a function to automatically unfeature past events
CREATE OR REPLACE FUNCTION unfeature_past_events()
RETURNS void AS $$
BEGIN
  UPDATE events
  SET is_featured = false
  WHERE is_featured = true
  AND date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- Optional: Create a scheduled job to run daily (if using pg_cron extension)
-- This would require pg_cron extension to be enabled in Supabase
-- SELECT cron.schedule('unfeature-past-events', '0 0 * * *', 'SELECT unfeature_past_events();');