const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Initialize Supabase client with service role key for admin operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase configuration in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function executeSQL() {
  try {
    console.log('Connecting to Supabase...');
    console.log('Database URL:', supabaseUrl);

    // Read the SQL file
    const sqlPath = path.join(__dirname, 'add-new-admin-users.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');

    // Split SQL into individual statements (by semicolon, but not within quotes)
    const statements = sqlContent
      .split(/;(?=(?:[^']*'[^']*')*[^']*$)/)
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--'));

    console.log(`Found ${statements.length} SQL statements to execute`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];

      // Skip if it's just the SELECT statement at the end
      if (statement.toLowerCase().startsWith('select')) {
        console.log('\nExecuting verification query...');
        const { data, error } = await supabase.rpc('sql', { query: statement });

        if (error) {
          // Try direct query if rpc doesn't work
          const { data: users, error: selectError } = await supabase
            .from('admin_users')
            .select('email, full_name, role, is_active, created_at')
            .order('created_at', { ascending: false });

          if (selectError) {
            console.error('Error fetching users:', selectError.message);
          } else {
            console.log('\n✅ Current admin users in database:');
            users.forEach(user => {
              console.log(`   - ${user.email} (${user.full_name}) - Role: ${user.role}, Active: ${user.is_active}`);
            });
          }
        } else {
          console.log('\n✅ Admin users verified:', data);
        }
        continue;
      }

      // Extract email from INSERT statement for logging
      const emailMatch = statement.match(/'([^']+@[^']+)'/);
      const email = emailMatch ? emailMatch[1] : 'unknown';

      console.log(`\nProcessing user: ${email}`);

      // Parse the INSERT statement to extract values
      const valuesMatch = statement.match(/VALUES\s*\(([\s\S]+?)\)/);
      if (!valuesMatch) {
        console.log('Skipping non-INSERT statement');
        continue;
      }

      // Extract individual values
      const values = valuesMatch[1]
        .split(',')
        .map(v => v.trim())
        .map(v => v.replace(/^'|'$/g, '').replace(/TIMEZONE\([^)]+\)/, 'NOW()'));

      const [emailVal, passwordHash, fullName, role, isActive] = values;

      // Use Supabase client to insert/update
      const { data, error } = await supabase
        .from('admin_users')
        .upsert({
          email: emailVal,
          password_hash: passwordHash,
          full_name: fullName,
          role: role,
          is_active: isActive === 'true'
        }, {
          onConflict: 'email'
        })
        .select();

      if (error) {
        console.error(`   ❌ Error for ${email}:`, error.message);
      } else {
        console.log(`   ✅ Successfully added/updated ${email}`);
      }
    }

    // Final verification - get all admin users
    console.log('\n=== Final Verification ===');
    const { data: allUsers, error: finalError } = await supabase
      .from('admin_users')
      .select('email, full_name, role, is_active')
      .order('email');

    if (finalError) {
      console.error('Error fetching final user list:', finalError.message);
    } else {
      console.log('\n✅ All admin users in database:');
      console.log('================================');
      allUsers.forEach(user => {
        console.log(`${user.email.padEnd(35)} | ${(user.full_name || 'N/A').padEnd(20)} | ${user.role.padEnd(12)} | Active: ${user.is_active}`);
      });
      console.log('================================');
      console.log(`Total admin users: ${allUsers.length}`);
    }

    console.log('\n✅ Script completed successfully!');
    console.log('All users can now log in with password: Password123');

  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

// Run the script
executeSQL();