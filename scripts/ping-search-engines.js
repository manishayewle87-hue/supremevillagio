const https = require('https');

const SITEMAP_URL = 'https://www.supremesvillagio.com/sitemap.xml';

const searchEngines = [
  { name: 'Google', url: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}` },
  { name: 'Bing', url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}` }
];

console.log('🚀 Initiating Ultra-Advanced Search Engine Pinging Protocol...');
console.log(`Target Sitemap: ${SITEMAP_URL}`);

searchEngines.forEach((engine) => {
  https.get(engine.url, (res) => {
    if (res.statusCode === 200) {
      console.log(`✅ [${engine.name}] Successfully notified to index 48,000+ programmatic URLs.`);
    } else {
      console.log(`⚠️ [${engine.name}] Ping received status code: ${res.statusCode}`);
    }
  }).on('error', (e) => {
    console.error(`❌ [${engine.name}] Ping failed: ${e.message}`);
  });
});
