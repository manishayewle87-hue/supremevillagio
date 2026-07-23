const https = require('https');

const HOST = 'www.supremesvillagio.com';
const KEY = 'e3b0c44298fc1c149afbf4c8996fb924';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Core URLs to submit
const urls = [
  `https://${HOST}/`,
  `https://${HOST}/supreme-villagio/vision`,
  `https://${HOST}/supreme-villagio/architecture`,
  `https://${HOST}/supreme-villagio/residences`,
  `https://${HOST}/supreme-villagio/amenities`,
  `https://${HOST}/supreme-villagio/location`,
  `https://${HOST}/blog`,
  `https://${HOST}/blog/investment-somatane-pune-2026`,
  `https://${HOST}/blog/4-bhk-vs-5-bhk-villas-pune`,
  `https://${HOST}/blog/living-near-hinjewadi-gated-communities`,
  `https://${HOST}/supreme-villagio/pune/villas`,
  `https://${HOST}/supreme-villagio/somatane/villas/5-bhk-villas`,
  `https://${HOST}/supreme-villagio/somatane/bungalows/twin-bungalows`,
];

const data = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urls
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/IndexNow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  console.log(`IndexNow Submission Status: ${res.statusCode}`);
  res.on('data', d => process.stdout.write(d));
});

req.on('error', (error) => {
  console.error('IndexNow Error:', error);
});

req.write(data);
req.end();

console.log(`Submitted ${urls.length} critical URLs to Bing, Yahoo, and Yandex via IndexNow.`);
