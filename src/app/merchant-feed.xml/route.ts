import { generateSeoSlugs, generateSeoDataFromSlug } from '@/lib/seo-data';

export async function GET() {
  const baseUrl = 'https://www.supremesvillagio.com';
  
  // We extract a high-intent segment (first 2,500 properties) for Google Merchant Center 
  // to prevent timeout and ensure high trust scores for the initial GMC sync.
  const allSlugs = generateSeoSlugs();
  const targetSlugs = allSlugs.slice(0, 2500);

  let itemsXml = '';

  targetSlugs.forEach((slugArray) => {
    const urlPath = slugArray.join('/');
    const data = generateSeoDataFromSlug(slugArray);
    const sku = slugArray.join('-').substring(0, 50); // GMC limit is 50 chars for ID
    
    // Convert generic real estate string to Google Shopping strict parameters
    itemsXml += `
    <item>
      <g:id>${sku}</g:id>
      <g:title><![CDATA[${data.title.substring(0, 150)}]]></g:title>
      <g:description><![CDATA[${data.description.substring(0, 5000)}]]></g:description>
      <g:link>${baseUrl}/supreme-villagio/${urlPath}</g:link>
      <g:image_link>https://d66htbxvzotmo.cloudfront.net/media/1Xi8pH_seologo.jpg</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:price>28900000.00 INR</g:price>
      <g:brand>Supreme Universal</g:brand>
      <g:google_product_category>Home &amp; Garden &gt; Real Estate</g:google_product_category>
      <g:custom_label_0>${data.typology}</g:custom_label_0>
    </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Supreme Villagio Luxury Real Estate Portfolio</title>
    <link>${baseUrl}</link>
    <description>Ultra-Premium 4 &amp; 5 BHK Villas and Bungalows in Pune</description>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
