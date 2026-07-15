import { MetadataRoute } from 'next'
import { generateSeoSlugs } from '@/lib/seo-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.supremesvillagio.com';
  const slugs = generateSeoSlugs();
  
  // Base URLs (Priority 1.0)
  const sitemapData: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    }
  ];

  // Core Pages (Priority 0.9)
  const corePages = ['/supreme-villagio/vision', '/supreme-villagio/architecture', '/supreme-villagio/residences', '/supreme-villagio/amenities', '/supreme-villagio/location'];
  corePages.forEach((page) => {
    sitemapData.push({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  });

  // Dynamic SEO Slugs (Priority 0.8)
  slugs.forEach((slugArray) => {
    sitemapData.push({
      url: `${baseUrl}/supreme-villagio/${slugArray.join('/')}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Blog Pages (Priority 0.8)
  sitemapData.push({
    url: `${baseUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  });

  // I cannot easily import 'fs' inside sitemap.ts if the environment restricts it, but Next.js App Router sitemap allows Node APIs. Let's assume it works or we'll catch the error on build.
  // We can just use the markdown library we created.
  // Actually, I'll use it safely.
  try {
    const { getPostSlugs } = require('@/lib/markdown');
    const blogSlugs = getPostSlugs();
    blogSlugs.forEach((slug: string) => {
      sitemapData.push({
        url: `${baseUrl}/blog/${slug.replace(/\.md$/, '')}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  } catch(e) {
    console.error("Could not generate blog sitemap", e);
  }

  // Legal & Utility Pages (Priority 0.3)
  const legalPages = ['/privacy', '/terms'];
  legalPages.forEach((page) => {
    sitemapData.push({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    });
  });

  return sitemapData;
}
