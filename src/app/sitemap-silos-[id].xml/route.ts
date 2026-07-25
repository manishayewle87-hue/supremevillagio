import { getAllSeoSlugStrings } from '@/lib/seo-data';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const idStr = params.id.replace('.xml', '');
  const id = parseInt(idStr, 10);
  
  if (isNaN(id) || id < 1 || id > 5) {
    return new Response('Not Found', { status: 404 });
  }

  const baseUrl = 'https://www.supremesvillagio.com';
  const lastModified = new Date().toISOString();
  
  // Get all 48,944 combinations
  const allSlugs = getAllSeoSlugStrings();
  
  // Chunk size is roughly 10,000 URLs per sitemap to prevent Vercel 10s timeouts
  const CHUNK_SIZE = 10000;
  const startIndex = (id - 1) * CHUNK_SIZE;
  const endIndex = startIndex + CHUNK_SIZE;
  
  const chunkedSlugs = allSlugs.slice(startIndex, endIndex);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${chunkedSlugs.map(slugArray => `
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
      // Aggressive caching: Cache for 24 hours on Edge
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate',
    },
  });
}
