const fs = require('fs');
const path = require('path');

// 1. Update Sitemap Silos Route (Micro-chunking)
const siloPath = path.join(__dirname, 'src/app/sitemap-silos-[id].xml/route.ts');
let siloContent = fs.readFileSync(siloPath, 'utf8');
siloContent = siloContent.replace('const urlsPerSilo = 10000;', 'const urlsPerSilo = 1000;'); // Drop chunk size
// Ensure it imports 'export const runtime = "edge";' to execute on Cloudflare workers properly
if (!siloContent.includes('export const runtime =')) {
  siloContent = 'export const runtime = "edge";\n' + siloContent;
}
fs.writeFileSync(siloPath, siloContent);

// 2. Update Master Sitemap (Increase Silo Count)
const masterSitemapPath = path.join(__dirname, 'src/app/sitemap.xml/route.ts');
let masterSitemapContent = fs.readFileSync(masterSitemapPath, 'utf8');
masterSitemapContent = masterSitemapContent.replace('const totalSilos = 8;', 'const totalSilos = 68;'); // Increase chunks
if (!masterSitemapContent.includes('export const runtime =')) {
  masterSitemapContent = 'export const runtime = "edge";\n' + masterSitemapContent;
}
fs.writeFileSync(masterSitemapPath, masterSitemapContent);

console.log("Sitemaps updated for micro-chunking.");
