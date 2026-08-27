const { google } = require('googleapis');
const fs = require('fs');

// We use the SEO matrix generator to pull URLs
// Since Node can't easily import TS files directly without ts-node, we'll construct the top URLs manually or parse them.
// To keep it simple and robust for CI/CD, we will target the high-priority index routes.
const BASE_URL = 'https://www.supremesvillagio.com';

const TOP_URLS_TO_INDEX = [
  `${BASE_URL}/`,
  `${BASE_URL}/locations`,
  `${BASE_URL}/blog`,
  `${BASE_URL}/blog/ultimate-guide-luxury-real-estate-pune-2026`,
  `${BASE_URL}/blog/somatane-vs-lonavala-second-home-investment`,
  // High-Intent Typologies
  `${BASE_URL}/supreme-villagio/4-bhk-villas/somatane`,
  `${BASE_URL}/supreme-villagio/5-bhk-villas/somatane`,
  `${BASE_URL}/supreme-villagio/4-bhk-twin-villas/pune`,
  `${BASE_URL}/supreme-villagio/luxury-bungalows/pune`,
  `${BASE_URL}/supreme-villagio/twin-bungalows/somatane`,
  `${BASE_URL}/supreme-villagio/4-bhk-villas/baner/premium-residential-projects`,
  `${BASE_URL}/supreme-villagio/5-bhk-villas/hinjawadi/luxury-gated-villas`
];

async function submitToGoogle() {
  console.log('🚀 Starting Google Indexing API Push...');

  const credentialsJson = process.env.GOOGLE_API_CREDENTIALS;
  if (!credentialsJson) {
    console.error('❌ GOOGLE_API_CREDENTIALS secret is missing. Skipping Google Indexing.');
    process.exit(0); // Exit gracefully so the CI doesn't fail if the user hasn't set it up yet
  }

  let credentials;
  try {
    credentials = JSON.parse(credentialsJson);
  } catch (e) {
    console.error('❌ GOOGLE_API_CREDENTIALS is not valid JSON. Skipping.');
    process.exit(0);
  }

  const jwtClient = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/indexing'],
    null
  );

  try {
    await jwtClient.authorize();
    console.log('✅ Successfully authenticated with Google Cloud Service Account');

    const indexing = google.indexing({
      version: 'v3',
      auth: jwtClient,
    });

    for (const url of TOP_URLS_TO_INDEX) {
      try {
        const response = await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED', // Tells Google to crawl this immediately
          },
        });
        console.log(`✅ Successfully pushed: ${url} (Status: ${response.status})`);
      } catch (err) {
        console.error(`❌ Failed to push ${url}:`, err.message);
      }
      
      // Google API Rate limit protection (Wait 500ms between requests)
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('🎉 Google Indexing API Push Complete!');
  } catch (error) {
    console.error('❌ Authentication failed:', error.message);
  }
}

submitToGoogle();
