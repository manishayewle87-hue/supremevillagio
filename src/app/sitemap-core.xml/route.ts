export async function GET() {
  const baseUrl = 'https://www.supremesvillagio.com';
  const lastModified = new Date().toISOString();

  const corePages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/supreme-villagio/vision', priority: '0.9', changefreq: 'weekly' },
    { url: '/supreme-villagio/architecture', priority: '0.9', changefreq: 'weekly' },
    { url: '/supreme-villagio/residences', priority: '0.9', changefreq: 'weekly' },
    { url: '/supreme-villagio/amenities', priority: '0.9', changefreq: 'weekly' },
    { url: '/supreme-villagio/location', priority: '0.9', changefreq: 'weekly' },
    { url: '/privacy', priority: '0.3', changefreq: 'monthly' },
    { url: '/terms', priority: '0.3', changefreq: 'monthly' },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${corePages.map(page => `
    <url>
      <loc>${baseUrl}${page.url}</loc>
      <lastmod>${lastModified}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
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
