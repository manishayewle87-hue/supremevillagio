import { MetadataRoute } from 'next'
import { generateSeoSlugs } from '@/lib/seo-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://supremevillagio.com';
  const slugs = generateSeoSlugs();
  
  // Base URLs
  const sitemapData: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    }
  ];

  // Dynamic SEO Slugs
  slugs.forEach((slugArray) => {
    sitemapData.push({
      url: `${baseUrl}/supreme-villagio/${slugArray[0]}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  return sitemapData;
}
