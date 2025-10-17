const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function addFeaturedField() {
  console.log('Adding featured event field to database...\n');

  try {
    // Add the is_featured column
    const { error: alterError } = await supabase.rpc('query', {
      query: `
        ALTER TABLE events
        ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
      `
    });

    if (alterError && !alterError.message.includes('already exists')) {
      console.error('Error adding column:', alterError);
    } else {
      console.log('✅ Added is_featured column to events table');
    }

    // Create index
    const { error: indexError } = await supabase.rpc('query', {
      query: `
        CREATE INDEX IF NOT EXISTS idx_events_featured
        ON events(is_featured, date, time)
        WHERE is_featured = true AND is_published = true;
      `
    });

    if (indexError && !indexError.message.includes('already exists')) {
      console.error('Error creating index:', indexError);
    } else {
      console.log('✅ Created index for featured events');
    }

    // Create cleanup function
    const { error: funcError } = await supabase.rpc('query', {
      query: `
        CREATE OR REPLACE FUNCTION unfeature_past_events()
        RETURNS void AS $$
        BEGIN
          UPDATE events
          SET is_featured = false
          WHERE is_featured = true
          AND date < CURRENT_DATE;
        END;
        $$ LANGUAGE plpgsql;
      `
    });

    if (funcError) {
      console.error('Error creating function:', funcError);
    } else {
      console.log('✅ Created cleanup function for past events');
    }

    // Verify the column exists by fetching events
    const { data, error } = await supabase
      .from('events')
      .select('id, title, is_featured')
      .limit(1);

    if (error) {
      console.error('Error verifying:', error);
    } else {
      console.log('\n✅ Database schema updated successfully!');
      console.log('   Events table now has is_featured field');
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

addFeaturedField();