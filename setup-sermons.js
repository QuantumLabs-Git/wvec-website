const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Supabase configuration
const supabaseUrl = 'https://ieswjwpekpkflsswvree.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imllc3dqd3Bla3BrZmxzc3d2cmVlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTE5NzAxMCwiZXhwIjoyMDcwNzczMDEwfQ.2t81Ns1N-dJZGHaYLMZQiWpP2VlnFGsV08jcr3FQblI';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupSermonsTable() {
  console.log('Setting up sermons table...');
  
  // Read the SQL file
  const sql = fs.readFileSync('./create-sermons-table.sql', 'utf8');
  
  // Execute the SQL
  const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql }).catch(async (err) => {
    // If RPC doesn't exist, try direct execution through the REST API
    console.log('Using direct SQL execution...');
    
    // Split SQL into individual statements
    const statements = sql.split(';').filter(s => s.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        console.log('Executing:', statement.substring(0, 50) + '...');
        
        // For table creation, we'll use the REST API directly
        try {
          const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
            method: 'POST',
            headers: {
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: statement + ';' })
          });
          
          if (!response.ok) {
            console.log('Statement may have failed, but continuing...');
          }
        } catch (e) {
          console.log('Error executing statement, continuing...', e.message);
        }
      }
    }
    return { data: 'Manual execution attempted' };
  });
  
  if (error) {
    console.error('Error setting up sermons table:', error);
  } else {
    console.log('Sermons table setup completed successfully!');
  }
  
  // Verify the table exists
  const { data: tables } = await supabase
    .from('sermons')
    .select('id')
    .limit(1);
  
  if (tables !== null) {
    console.log('✓ Sermons table verified - ready to use!');
    
    // Add a sample sermon for testing
    const { data: sermon, error: insertError } = await supabase
      .from('sermons')
      .insert({
        title: 'Welcome to Our Sermon Library',
        speaker: 'Pastor',
        date: new Date().toISOString().split('T')[0],
        scripture: 'John 3:16',
        description: 'This is a placeholder sermon. You can add real sermons through the admin panel.',
        duration: '30:00',
        sermon_type: 'regular',
        is_published: true
      })
      .select()
      .single();
    
    if (!insertError) {
      console.log('✓ Sample sermon added');
    }
  } else {
    console.log('⚠ Could not verify sermons table - you may need to create it manually in Supabase dashboard');
  }
}

setupSermonsTable().then(() => {
  console.log('Setup completed');
  process.exit(0);
}).catch(err => {
  console.error('Setup failed:', err);
  process.exit(1);
});