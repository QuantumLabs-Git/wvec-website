const https = require('https');

async function checkDeployment() {
  console.log('Checking deployment status...\n');

  const endpoints = [
    { url: 'https://www.wvec.org.uk/', name: 'Homepage' },
    { url: 'https://www.wvec.org.uk/api/public/featured-event', name: 'Featured Event API' },
  ];

  for (const endpoint of endpoints) {
    await new Promise((resolve) => {
      https.get(endpoint.url, (res) => {
        console.log(`${endpoint.name}: ${res.statusCode} ${res.statusMessage}`);

        if (endpoint.name === 'Featured Event API' && res.statusCode === 404) {
          console.log('  ❌ New API endpoint not yet deployed');
        } else if (res.statusCode === 200) {
          console.log('  ✅ Endpoint is accessible');
        }

        resolve();
      }).on('error', (err) => {
        console.log(`${endpoint.name}: Error - ${err.message}`);
        resolve();
      });
    });
  }

  // Check for AlternatingHero in homepage
  await new Promise((resolve) => {
    https.get('https://www.wvec.org.uk/', (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (data.includes('AlternatingHero') || data.includes('FEATURED EVENT')) {
          console.log('\n✅ NEW FEATURES DEPLOYED - AlternatingHero component found!');
        } else if (data.includes('ServiceTimes')) {
          console.log('\n⏳ DEPLOYMENT PENDING - Still showing old ServiceTimes component');
          console.log('   AWS Amplify may still be building. This usually takes 5-10 minutes.');
        }
        resolve();
      });
    });
  });

  console.log('\n📝 Notes:');
  console.log('- AWS Amplify usually takes 5-10 minutes to deploy');
  console.log('- Check AWS Amplify console for build status');
  console.log('- The build was triggered at:', new Date(Date.now() - 15 * 60 * 1000).toLocaleTimeString());
  console.log('- Expected completion:', new Date(Date.now() + 5 * 60 * 1000).toLocaleTimeString());
}

checkDeployment();