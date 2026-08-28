const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../src/app/supreme-villagio/[...slug]/page.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

const breadcrumbSchemaCode = `
  // Breadcrumb Schema for SERP CTR Dominance
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": slugArray.map((slug, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": slug.replace(/-/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase()),
      "item": \`https://www.supremesvillagio.com/supreme-villagio/\${slugArray.slice(0, index + 1).join('/')}\`
    }))
  };
`;

// Insert the code right before `const entityGraphJsonLd`
content = content.replace('const entityGraphJsonLd = {', breadcrumbSchemaCode + '\n  const entityGraphJsonLd = {');

// Inject the Script tag
const scriptTag = `      <Script
        id={\`json-ld-breadcrumb-\${slugArray.join('-')}\`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />`;

content = content.replace('<LandingPageTemplate', scriptTag + '\n      <LandingPageTemplate');

fs.writeFileSync(targetFile, content);
console.log("Breadcrumb schema injected.");
