const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../src/app/layout.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// Add imports
const importStatement = `import { Analytics } from "@vercel/analytics/react";\nimport { SpeedInsights } from "@vercel/speed-insights/next";\n`;
if (!content.includes('@vercel/analytics')) {
  content = content.replace(/(import .*;\n)+/, match => match + importStatement);
}

// Add components before </body>
const components = `
        <Analytics />
        <SpeedInsights />
      </body>`;
content = content.replace('</body>', components);

fs.writeFileSync(targetFile, content);
console.log("Vercel Insights injected into layout.");
