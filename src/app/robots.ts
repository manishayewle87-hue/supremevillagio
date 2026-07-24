import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.supremesvillagio.com';

  return {
    rules: [
      {
        userAgent: ['Googlebot', 'Bingbot', 'Applebot', 'YandexBot', 'DuckDuckBot', 'Slurp', 'Baiduspider'],
        allow: '/',
      },
      {
        userAgent: [
          'AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot', 'PetalBot', 'YandexImages',
          'MegaIndex.ru', 'BLEXBot', 'BuiltBotTough', 'DataForSeoBot'
        ],
        disallow: '/', // Aggressively block scrapers to conserve compute for actual buyers & engines
      },
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-core.xml`,
      `${baseUrl}/sitemap-silos.xml`,
      `${baseUrl}/sitemap-media.xml`,
    ],
    host: baseUrl,
  };
}
