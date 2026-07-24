import { getAllSeoSlugStrings } from '@/lib/seo-data';

export async function GET() {
  const baseUrl = 'https://www.supremesvillagio.com';
  const lastModified = new Date().toISOString();
  // Get all 38,000+ HNI programmatic combinations instantly
  const slugs = getAllSeoSlugStrings();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${slugs.map(slugArray => `
    <url>
      <loc>${baseUrl}/supreme-villagio/${slugArray.join('/')}</loc>
      <lastmod>${lastModified}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `).join('')}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
