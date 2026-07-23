export async function GET() {
  const baseUrl = 'https://www.supremesvillagio.com';
  
  // High-priority media assets that MUST rank in Google Images
  const mediaItems = [
    {
      pageUrl: '/',
      imageUrl: 'https://cdn.supremeuniversal.com/media/Q9b1g7_Supreme-Villagio-Logo.svg',
      title: 'Supreme Villagio Somatane Logo',
      caption: 'Official logo of Supreme Villagio Luxury Villas in Somatane Pune'
    },
    {
      pageUrl: '/',
      imageUrl: 'https://cdn.supremeuniversal.com/media/Supreme-Villagio--Desktop-Banner-3_IOrvdm.jpg',
      title: 'Supreme Villagio 4 & 5 BHK Luxury Villas',
      caption: 'Exterior view of the luxury horizontal living project in Somatane, Pune'
    },
    {
      pageUrl: '/supreme-villagio/amenities',
      imageUrl: 'https://cdn.supremeuniversal.com/media/1Xi8pH_seologo.jpg',
      title: 'Club Villagio Amenities',
      caption: 'World-class Club Villagio amenities at Supreme Villagio Somatane'
    }
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${mediaItems.map(item => `
    <url>
      <loc>${baseUrl}${item.pageUrl}</loc>
      <image:image>
        <image:loc>${item.imageUrl}</image:loc>
        <image:title>${item.title}</image:title>
        <image:caption>${item.caption}</image:caption>
      </image:image>
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
