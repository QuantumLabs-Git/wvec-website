const https = require('https');
const { execSync } = require('child_process');

console.log('='.repeat(60));
console.log('🚀 WVEC FEATURED EVENTS DEPLOYMENT VERIFICATION');
console.log('='.repeat(60));

async function checkEndpoint(url, name, expectedContent = null) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log(`\n${name}:`);
        console.log(`  Status: ${res.statusCode} ${res.statusMessage}`);

        if (res.statusCode === 200) {
          console.log('  ✅ Endpoint is accessible');

          if (expectedContent) {
            if (data.includes(expectedContent)) {
              console.log(`  ✅ Contains expected content: "${expectedContent}"`);
            } else {
              console.log(`  ⚠️  Missing expected content: "${expectedContent}"`);
            }
          }

          // For API endpoint, try to parse JSON
          if (name.includes('API') && data) {
            try {
              const json = JSON.parse(data);
              console.log('  📦 Response:', JSON.stringify(json, null, 2).substring(0, 200));
            } catch (e) {
              // Not JSON, that's ok
            }
          }
        } else if (res.statusCode === 404) {
          console.log('  ❌ Endpoint not found (deployment may be pending)');
        } else {
          console.log('  ⚠️  Unexpected status code');
        }

        resolve({ status: res.statusCode, data });
      });
    }).on('error', (err) => {
      console.log(`\n${name}:`);
      console.log(`  ❌ Error: ${err.message}`);
      resolve({ status: 0, data: '' });
    });
  });
}

async function getLastCommit() {
  try {
    const commit = execSync('git log -1 --pretty=format:"%h %s" --no-merges').toString().trim();
    const time = execSync('git log -1 --pretty=format:"%ar"').toString().trim();
    console.log('\n📝 Last Commit:');
    console.log(`  ${commit}`);
    console.log(`  Pushed: ${time}`);
  } catch (e) {
    console.log('\n📝 Unable to get git info');
  }
}

async function verifyDeployment() {
  // Check git status first
  await getLastCommit();

  console.log('\n' + '='.repeat(60));
  console.log('🔍 CHECKING PRODUCTION ENDPOINTS');
  console.log('='.repeat(60));

  // Check main endpoints
  const homepage = await checkEndpoint(
    'https://www.wvec.org.uk/',
    '1. Homepage',
    'AlternatingHero'
  );

  const featuredApi = await checkEndpoint(
    'https://www.wvec.org.uk/api/public/featured-event',
    '2. Featured Event API'
  );

  const cleanupApi = await checkEndpoint(
    'https://www.wvec.org.uk/api/cleanup-featured',
    '3. Cleanup Featured API'
  );

  // Check admin pages
  console.log('\n' + '='.repeat(60));
  console.log('👤 CHECKING ADMIN PAGES');
  console.log('='.repeat(60));

  const adminEvents = await checkEndpoint(
    'https://www.wvec.org.uk/admin/events',
    '4. Admin Events Page'
  );

  // Deployment status summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 DEPLOYMENT STATUS SUMMARY');
  console.log('='.repeat(60));

  const deploymentComplete =
    homepage.data.includes('AlternatingHero') &&
    featuredApi.status === 200;

  if (deploymentComplete) {
    console.log('\n🎉 DEPLOYMENT COMPLETE!');
    console.log('   ✅ AlternatingHero component is live');
    console.log('   ✅ Featured Event API is accessible');
    console.log('   ✅ All systems operational');
  } else {
    console.log('\n⏳ DEPLOYMENT IN PROGRESS...');

    if (!homepage.data.includes('AlternatingHero')) {
      console.log('   ⚠️  Homepage still showing old components');
    }
    if (featuredApi.status !== 200) {
      console.log('   ⚠️  Featured Event API not yet deployed');
    }

    console.log('\n   AWS Amplify typically takes 5-10 minutes to deploy.');
    console.log('   Check the AWS Amplify console for detailed build status:');
    console.log('   https://eu-west-2.console.aws.amazon.com/amplify/apps');
  }

  // Next steps
  console.log('\n' + '='.repeat(60));
  console.log('📋 NEXT STEPS');
  console.log('='.repeat(60));

  if (deploymentComplete) {
    console.log('\n1. ✅ Visit the admin panel to feature an event:');
    console.log('   https://www.wvec.org.uk/admin/events');
    console.log('\n2. ✅ Check the homepage to see the alternating hero:');
    console.log('   https://www.wvec.org.uk/');
    console.log('\n3. ✅ The featured event will alternate with service times');
  } else {
    console.log('\n1. ⏳ Wait for AWS Amplify to complete the build');
    console.log('2. 🔄 Run this script again in a few minutes:');
    console.log('   node verify-deployment.js');
    console.log('3. 📊 Monitor AWS Amplify console for build logs');
  }

  console.log('\n' + '='.repeat(60));
  console.log('Verification completed at:', new Date().toLocaleTimeString());
  console.log('='.repeat(60));
}

verifyDeployment();