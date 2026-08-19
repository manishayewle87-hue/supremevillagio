const https = require('https');

const HOST = 'www.supremesvillagio.com';
const KEY = 'c2e5a8f4b1d64e97a3b2c1d0e5f4a6b7';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// We explicitly push the silo indexes to IndexNow
const urlList = [
  `https://${HOST}/`,
  `https://${HOST}/sitemap-core.xml`,
  `https://${HOST}/sitemap-silos-1.xml`,
  `https://${HOST}/sitemap-silos-2.xml`,
  `https://${HOST}/sitemap-silos-3.xml`,
  `https://${HOST}/sitemap-silos-4.xml`,
  `https://${HOST}/sitemap-silos-5.xml`,
  `https://${HOST}/sitemap-silos-6.xml`
];

const postData = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urlList
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('🚀 Initiating Ultra-Advanced IndexNow Protocol...');

const req = https.request(options, (res) => {
  console.log(`[IndexNow API] Status: ${res.statusCode}`);
  if (res.statusCode === 200 || res.statusCode === 202) {
    console.log('✅ SUCCESS: URLs successfully submitted to IndexNow (Bing, Yandex, Seznam).');
  } else {
    console.error(`❌ ERROR: Failed to submit URLs. Status code: ${res.statusCode}`);
  }
});

req.on('error', (error) => {
  console.error(`❌ FATAL ERROR: ${error.message}`);
});

req.write(postData);
req.end();
