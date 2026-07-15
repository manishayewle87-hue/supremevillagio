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
