import { getAllPosts } from '@/lib/markdown';

export async function GET() {
  const baseUrl = 'https://www.supremesvillagio.com';
  const lastModified = new Date().toISOString();
  
  let blogSlugs: string[] = [];
  let allTags: string[] = [];
  try {
    const posts = getAllPosts();
    blogSlugs = posts.map(post => post.slug);
    allTags = Array.from(new Set(posts.flatMap(post => post.tags || [])));
  } catch(e) {
    console.error("Could not generate blog sitemap data", e);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main Blog Index -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Category Silos -->
  ${allTags.map(tag => `
    <url>
      <loc>${baseUrl}/blog/category/${tag}</loc>
      <lastmod>${lastModified}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
  `).join('')}

  <!-- Individual Articles -->
  ${blogSlugs.map(slug => `
    <url>
      <loc>${baseUrl}/blog/${slug}</loc>
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
