import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.supremesvillagio.com';

  return {
    rules: [
      {
        userAgent: ['Googlebot', 'Bingbot', 'Applebot', 'YandexBot', 'Baiduspider', 'DuckDuckBot'],
        allow: '/',
        crawlDelay: 2, // Ensure continuous aggressive crawling without DDoS'ing the Edge Network
      },
      {
        userAgent: [
          'AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot', 'PetalBot', 'YandexImages',
          'MegaIndex.ru', 'BLEXBot', 'BuiltBotTough', 'DataForSeoBot'
        ],
        disallow: '/', // Block toxic SEO scrapers to conserve compute strictly for HNI buyers & Search Engines
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: '/*?*', // Aggressively block all dynamic query parameter spider traps
        crawlDelay: 5,
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml` // The root index handles all chunked silos natively
    ],
    host: baseUrl,
  };
}
