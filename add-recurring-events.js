const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://ieswjwpekpkflsswvree.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imllc3dqd3Bla3BrZmxzc3d2cmVlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTE5NzAxMCwiZXhwIjoyMDcwNzczMDEwfQ.2t81Ns1N-dJZGHaYLMZQiWpP2VlnFGsV08jcr3FQblI';

const supabase = createClient(supabaseUrl, supabaseKey);

async function addRecurringEvents() {
  console.log('Starting to add recurring events...');
  
  // Define the recurring events
  const recurringEvents = [
    {
      title: 'Thursday Bible Study',
      description: 'In-depth study of Scripture with Pastor',
      time: '10:30 AM',
      location: 'Whiddon Valley Evangelical Church',
      category: 'study',
      dayOfWeek: 4, // Thursday
      startDate: new Date('2025-01-02') // First Thursday of 2025
    },
    {
      title: 'Sunday Morning Service',
      description: 'Join us for worship and the preaching of God\'s Word from the King James Bible',
      time: '11:00 AM',
      location: 'Whiddon Valley Evangelical Church',
      category: 'service',
      dayOfWeek: 0, // Sunday
      startDate: new Date('2025-01-05') // First Sunday of 2025
    },
    {
      title: 'Sunday Evening Service',
      description: 'Evening worship and Bible teaching',
      time: '6:30 PM',
      location: 'Whiddon Valley Evangelical Church',
      category: 'service',
      dayOfWeek: 0, // Sunday
      startDate: new Date('2025-01-05') // First Sunday of 2025
    }
  ];

  const endDate = new Date('2027-01-01'); // Two years from now
  const events = [];

  for (const event of recurringEvents) {
    let currentDate = new Date(event.startDate);
    
    // Find the first occurrence of the day of week
    while (currentDate.getDay() !== event.dayOfWeek) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Generate events for every week
    while (currentDate < endDate) {
      events.push({
        title: event.title,
        description: event.description,
        date: currentDate.toISOString().split('T')[0],
        time: event.time,
        location: event.location,
        category: event.category,
        is_published: true,
        is_recurring: true,
        recurrence_pattern: 'weekly',
        recurrence_interval: 1
      });
      
      // Move to next week
      currentDate = new Date(currentDate);
      currentDate.setDate(currentDate.getDate() + 7);
    }
  }

  console.log(`Generated ${events.length} events to insert...`);

  // Insert events in batches to avoid timeouts
  const batchSize = 50;
  let totalInserted = 0;
  
  for (let i = 0; i < events.length; i += batchSize) {
    const batch = events.slice(i, i + batchSize);
    
    try {
      const { data, error } = await supabase
        .from('events')
        .insert(batch);
      
      if (error) {
        console.error('Error inserting batch:', error);
      } else {
        totalInserted += batch.length;
        console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}: ${batch.length} events (Total: ${totalInserted}/${events.length})`);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  }
  
  console.log(`\nCompleted! Inserted ${totalInserted} events total.`);
  
  // Verify by checking the count
  const { count, error: countError } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
    .eq('is_recurring', true);
  
  if (!countError) {
    console.log(`Total recurring events in database: ${count}`);
  }
}

// Run the script
addRecurringEvents().then(() => {
  console.log('Script completed');
  process.exit(0);
}).catch(err => {
  console.error('Script failed:', err);
  process.exit(1);
});