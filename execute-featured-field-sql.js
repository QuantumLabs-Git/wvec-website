const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase configuration');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function addFeaturedField() {
  console.log('Adding is_featured field to events table...\n');

  try {
    // First, let's check if the column already exists
    const { data: columns, error: columnsError } = await supabase
      .from('events')
      .select('*')
      .limit(1);

    if (!columnsError && columns && columns.length > 0) {
      const hasIsFeatured = columns[0].hasOwnProperty('is_featured');

      if (hasIsFeatured) {
        console.log('✅ Column is_featured already exists in events table');

        // Let's verify some data
        const { data: featuredEvents, error: featuredError } = await supabase
          .from('events')
          .select('id, title, is_featured')
          .eq('is_featured', true);

        if (!featuredError) {
          console.log(`\nCurrently ${featuredEvents?.length || 0} featured events in database`);
          if (featuredEvents && featuredEvents.length > 0) {
            console.log('Featured events:');
            featuredEvents.forEach(event => {
              console.log(`  - ${event.title}`);
            });
          }
        }

        console.log('\n✅ Database is ready for featured events!');
        return;
      }
    }

    // If we get here, the column doesn't exist yet
    console.log('Column does not exist yet. Please run the following SQL in Supabase SQL Editor:\n');
    console.log('----------------------------------------');
    console.log(`-- Add is_featured column to events table
ALTER TABLE events
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- Create an index for faster queries on featured events
CREATE INDEX IF NOT EXISTS idx_events_featured
ON events(is_featured, date, time)
WHERE is_featured = true AND is_published = true;

-- Optional: Create a function to automatically unfeature past events
CREATE OR REPLACE FUNCTION unfeature_past_events()
RETURNS void AS $$
BEGIN
  UPDATE events
  SET is_featured = false
  WHERE is_featured = true
  AND date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;`);
    console.log('----------------------------------------\n');

    console.log('To run this SQL:');
    console.log('1. Go to your Supabase dashboard');
    console.log('2. Navigate to SQL Editor');
    console.log('3. Click "New Query"');
    console.log('4. Paste the SQL above');
    console.log('5. Click "Run"\n');

    console.log('Dashboard URL: https://supabase.com/dashboard/project/ieswjwpekpkflsswvree/sql/new');

  } catch (error) {
    console.error('Error:', error);
  }
}

addFeaturedField();