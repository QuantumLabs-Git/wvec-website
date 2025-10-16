const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function addMissingUsers() {
  console.log('Checking and adding missing admin users...\n');

  // Users that should exist (as requested)
  const requiredUsers = [
    { email: 'dmjones3000@gmail.com', full_name: 'David M Jones', role: 'admin' },
    { email: 'davidwvec@gmail.com', full_name: 'David WVEC', role: 'admin' },
    { email: 'tomsmithnp95@gmail.com', full_name: 'Tom Smith', role: 'admin' },
    { email: 'benjaminmjones3434@gmail.com', full_name: 'Benjamin M Jones', role: 'admin' },
    { email: 'andrewangelajones@gmail.com', full_name: 'Andrew Angela Jones', role: 'admin' },
    { email: 'pastor@wvec.org.uk', full_name: 'Pastor', role: 'admin' },
    { email: 'secretary@wvec.org.uk', full_name: 'Secretary', role: 'admin' }
  ];

  // Check existing users
  const { data: existingUsers, error: fetchError } = await supabase
    .from('admin_users')
    .select('email')
    .in('email', requiredUsers.map(u => u.email));

  if (fetchError) {
    console.error('Error fetching users:', fetchError);
    return;
  }

  const existingEmails = existingUsers.map(u => u.email);
  const usersToAdd = requiredUsers.filter(u => !existingEmails.includes(u.email));

  if (usersToAdd.length === 0) {
    console.log('✅ All requested users already exist in the database!');
  } else {
    console.log(`Found ${usersToAdd.length} users to add:\n`);

    for (const user of usersToAdd) {
      const { data, error } = await supabase
        .from('admin_users')
        .insert({
          email: user.email,
          password_hash: '$2b$10$/ROqrT4E57F010O9Ag01ZeKEF6jeF.98J72NXEkOtrZ9VL9jwSKQ2',
          full_name: user.full_name,
          role: user.role,
          is_active: true
        })
        .select();

      if (error) {
        console.error(`❌ Error adding ${user.email}:`, error.message);
      } else {
        console.log(`✅ Added ${user.email} (${user.full_name})`);
      }
    }
  }

  // Show final list
  console.log('\n=== Final Admin Users List ===');
  const { data: allUsers } = await supabase
    .from('admin_users')
    .select('email, full_name, role, is_active')
    .order('email');

  console.log('================================');
  allUsers.forEach(user => {
    console.log(`${user.email.padEnd(35)} | ${(user.full_name || 'N/A').padEnd(20)} | ${user.role}`);
  });
  console.log('================================');
  console.log(`Total: ${allUsers.length} admin users`);
  console.log('\nAll users can log in with password: Password123');
}

addMissingUsers();