import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/api/', '/_next/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/private/', '/api/', '/_next/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/private/', '/api/', '/_next/'],
        crawlDelay: 2, // Prevent aggressive crawling
      },
      {
        userAgent: ['GPTBot', 'CCBot', 'anthropic-ai', 'Claude-Web', 'ClaudeBot', 'Omgili', 'Omgilibot', 'FacebookBot'],
        disallow: ['/'],
      }
    ],
    sitemap: 'https://www.supremesvillagio.com/sitemap.xml',
  }
}
