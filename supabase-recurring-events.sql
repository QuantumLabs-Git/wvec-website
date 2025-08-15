-- Add recurring event fields to events table
-- Run this in Supabase SQL Editor

-- Add recurring fields to events table
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS is_recurring BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS recurrence_pattern VARCHAR(50), -- 'daily', 'weekly', 'monthly', 'yearly'
ADD COLUMN IF NOT EXISTS recurrence_end_date DATE,
ADD COLUMN IF NOT EXISTS recurrence_interval INTEGER DEFAULT 1, -- e.g., every 2 weeks
ADD COLUMN IF NOT EXISTS recurrence_days_of_week TEXT[], -- for weekly: ['sunday', 'wednesday']
ADD COLUMN IF NOT EXISTS parent_event_id UUID REFERENCES events(id) ON DELETE CASCADE;

-- Create index for better performance when querying recurring events
CREATE INDEX IF NOT EXISTS idx_events_parent_event_id ON events(parent_event_id);
CREATE INDEX IF NOT EXISTS idx_events_is_recurring ON events(is_recurring);