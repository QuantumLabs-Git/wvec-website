const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = 'https://ieswjwpekpkflsswvree.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imllc3dqd3Bla3BrZmxzc3d2cmVlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTE5NzAxMCwiZXhwIjoyMDcwNzczMDEwfQ.2t81Ns1N-dJZGHaYLMZQiWpP2VlnFGsV08jcr3FQblI';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupSermons() {
  console.log('Checking if sermons table exists...');
  
  // Try to query the sermons table
  const { data: existingData, error: checkError } = await supabase
    .from('sermons')
    .select('id')
    .limit(1);
  
  if (checkError && checkError.message.includes('relation "public.sermons" does not exist')) {
    console.log('Sermons table does not exist.');
    console.log('\n⚠️  Please create the sermons table manually in Supabase:');
    console.log('1. Go to https://supabase.com/dashboard');
    console.log('2. Open your project (ieswjwpekpkflsswvree)');
    console.log('3. Go to SQL Editor');
    console.log('4. Paste and run the contents of create-sermons-table.sql');
    return;
  }
  
  if (checkError) {
    console.error('Error checking sermons table:', checkError);
    return;
  }
  
  console.log('✓ Sermons table exists!');
  
  // Check if there are any sermons
  const { data: sermons, count } = await supabase
    .from('sermons')
    .select('*', { count: 'exact' });
  
  console.log(`Found ${count || 0} sermons in the database.`);
  
  // Add a sample sermon if none exist
  if (!count || count === 0) {
    console.log('Adding sample sermon...');
    
    const { data: newSermon, error: insertError } = await supabase
      .from('sermons')
      .insert({
        title: 'The Authority of Scripture',
        speaker: 'Pastor David Kay',
        date: '2025-01-05',
        scripture: '2 Timothy 3:16-17',
        description: 'An exposition on the authority and sufficiency of Scripture for the Christian life.',
        duration: '45:30',
        sermon_type: 'regular',
        is_published: true
      })
      .select()
      .single();
    
    if (insertError) {
      console.error('Error adding sample sermon:', insertError);
    } else {
      console.log('✓ Sample sermon added successfully!');
      console.log('  Title:', newSermon.title);
      console.log('  ID:', newSermon.id);
    }
  }
}

setupSermons().then(() => {
  console.log('\nSetup completed!');
  console.log('You can now manage sermons through the admin panel.');
  process.exit(0);
}).catch(err => {
  console.error('Setup failed:', err);
  process.exit(1);
});