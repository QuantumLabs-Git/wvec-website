const https = require('https');

let checkCount = 0;
const maxChecks = 20; // Check for up to 10 minutes
const checkInterval = 30000; // Check every 30 seconds

console.log('🔄 Starting deployment monitoring...');
console.log('Will check every 30 seconds for up to 10 minutes\n');

function checkDeploymentStatus() {
  return new Promise((resolve) => {
    https.get('https://www.wvec.org.uk/api/public/featured-event', (res) => {
      if (res.statusCode === 200) {
        console.log(`✅ [${new Date().toLocaleTimeString()}] API DEPLOYED! Status: ${res.statusCode}`);
        resolve(true);
      } else {
        console.log(`⏳ [${new Date().toLocaleTimeString()}] API not ready yet. Status: ${res.statusCode}`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.log(`❌ [${new Date().toLocaleTimeString()}] Error checking: ${err.message}`);
      resolve(false);
    });
  });
}

async function checkHomepage() {
  return new Promise((resolve) => {
    https.get('https://www.wvec.org.uk/', (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const hasAlternatingHero = data.includes('AlternatingHero');
        if (hasAlternatingHero) {
          console.log(`✅ [${new Date().toLocaleTimeString()}] AlternatingHero component is LIVE!`);
        } else {
          console.log(`⏳ [${new Date().toLocaleTimeString()}] Homepage still showing old components`);
        }
        resolve(hasAlternatingHero);
      });
    }).on('error', () => {
      resolve(false);
    });
  });
}

async function monitor() {
  checkCount++;

  console.log(`\n--- Check #${checkCount} of ${maxChecks} ---`);

  const apiReady = await checkDeploymentStatus();
  const homepageReady = await checkHomepage();

  if (apiReady && homepageReady) {
    console.log('\n🎉 DEPLOYMENT COMPLETE! 🎉');
    console.log('✅ Featured Event API is live');
    console.log('✅ AlternatingHero component is deployed');
    console.log('\nYou can now:');
    console.log('1. Visit https://www.wvec.org.uk/admin/events to feature an event');
    console.log('2. Check https://www.wvec.org.uk/ to see the alternating hero in action');
    process.exit(0);
  }

  if (checkCount >= maxChecks) {
    console.log('\n⚠️  Maximum check time reached (10 minutes)');
    console.log('The deployment might be stuck or taking longer than expected.');
    console.log('Please check the AWS Amplify console directly:');
    console.log('https://eu-west-2.console.aws.amazon.com/amplify/apps');
    process.exit(1);
  }

  console.log(`Next check in 30 seconds...`);
  setTimeout(monitor, checkInterval);
}

// Start monitoring
monitor();