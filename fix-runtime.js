const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src/app/supreme-villagio/[...slug]/page.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

if (!content.includes('export const runtime =')) {
  content = content.replace('export const dynamicParams = true;', "export const runtime = 'edge';\nexport const dynamicParams = true;");
  fs.writeFileSync(targetFile, content);
  console.log("Edge runtime forced.");
} else {
  console.log("Edge runtime already present.");
}
