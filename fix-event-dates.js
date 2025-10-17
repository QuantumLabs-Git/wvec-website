const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://ieswjwpekpkflsswvree.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imllc3dqd3Bla3BrZmxzc3d2cmVlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTE5NzAxMCwiZXhwIjoyMDcwNzczMDEwfQ.2t81Ns1N-dJZGHaYLMZQiWpP2VlnFGsV08jcr3FQblI';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixEventDates() {
  console.log('Starting to fix event dates...');

  // First, let's get all recurring events
  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .eq('is_recurring', true)
    .order('date');

  if (error) {
    console.error('Error fetching events:', error);
    return;
  }

  console.log(`Found ${events.length} recurring events to check`);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let fixedCount = 0;
  const updates = [];

  for (const event of events) {
    const currentDate = new Date(event.date + 'T12:00:00');
    const currentDay = currentDate.getDay();

    let expectedDay = null;
    if (event.title.includes('Thursday')) {
      expectedDay = 4; // Thursday
    } else if (event.title.includes('Sunday')) {
      expectedDay = 0; // Sunday
    }

    if (expectedDay !== null && currentDay !== expectedDay) {
      // Calculate the correct date
      const dayDiff = expectedDay - currentDay;
      const correctedDate = new Date(currentDate);
      correctedDate.setDate(correctedDate.getDate() + dayDiff);

      const correctedDateStr = correctedDate.toISOString().split('T')[0];

      console.log(`Fixing: ${event.title} on ${event.date} (${days[currentDay]}) -> ${correctedDateStr} (${days[expectedDay]})`);

      updates.push({
        id: event.id,
        date: correctedDateStr
      });
      fixedCount++;
    }
  }

  if (updates.length > 0) {
    console.log(`\nFixing ${updates.length} events...`);

    // Update in batches
    const batchSize = 50;
    for (let i = 0; i < updates.length; i += batchSize) {
      const batch = updates.slice(i, i + batchSize);

      for (const update of batch) {
        const { error: updateError } = await supabase
          .from('events')
          .update({ date: update.date })
          .eq('id', update.id);

        if (updateError) {
          console.error(`Error updating event ${update.id}:`, updateError);
        }
      }

      console.log(`Updated batch ${Math.floor(i / batchSize) + 1}: ${batch.length} events`);
    }

    console.log(`\nSuccessfully fixed ${fixedCount} events!`);
  } else {
    console.log('\nNo events need fixing - all dates are correct!');
  }

  // Verify the fix
  console.log('\n--- Verification ---');
  const { data: thursdayCheck } = await supabase
    .from('events')
    .select('date, title')
    .ilike('title', '%Thursday%')
    .order('date')
    .limit(5);

  const { data: sundayCheck } = await supabase
    .from('events')
    .select('date, title')
    .ilike('title', '%Sunday%')
    .order('date')
    .limit(5);

  console.log('\nSample Thursday events after fix:');
  thursdayCheck?.forEach(e => {
    const d = new Date(e.date + 'T12:00:00');
    console.log(`  ${e.date} (${days[d.getDay()]}): ${e.title}`);
  });

  console.log('\nSample Sunday events after fix:');
  sundayCheck?.forEach(e => {
    const d = new Date(e.date + 'T12:00:00');
    console.log(`  ${e.date} (${days[d.getDay()]}): ${e.title}`);
  });
}

// Run the script
fixEventDates().then(() => {
  console.log('Script completed');
  process.exit(0);
}).catch(err => {
  console.error('Script failed:', err);
  process.exit(1);
});