const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../src/app/supreme-villagio/[...slug]/page.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

const videoSchemaCode = `
  // VideoObject Schema for Google Video Search Dominance
  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": data.title,
    "description": "Exclusive walkthrough film of Supreme Villagio in Somatane, Pune. Explore the ultra-premium 4 & 5 BHK luxury villas and bungalows.",
    "thumbnailUrl": [
      "https://cdn.supremeuniversal.com/media/Supreme-Villagio--Desktop-Banner-3_IOrvdm.jpg"
    ],
    "uploadDate": "2026-08-01T08:00:00+08:00",
    "contentUrl": "https://www.youtube.com/watch?v=placeholder",
    "embedUrl": "https://www.youtube.com/embed/placeholder",
    "publisher": {
      "@type": "Organization",
      "name": "Supreme Universal",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cdn.supremeuniversal.com/media/Q9b1g7_Supreme-Villagio-Logo.svg"
      }
    }
  };
`;

content = content.replace('const entityGraphJsonLd = {', videoSchemaCode + '\n  const entityGraphJsonLd = {');

const scriptTag = `      <Script
        id={\`json-ld-video-\${slugArray.join('-')}\`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />`;

content = content.replace('<LandingPageTemplate', scriptTag + '\n      <LandingPageTemplate');

fs.writeFileSync(targetFile, content);
console.log("Video schema injected.");
