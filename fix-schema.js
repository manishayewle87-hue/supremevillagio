const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src/app/layout.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

const sameAsInjection = `  "sameAs": [
    "https://www.google.com/maps/place/Supreme+Villagio/@18.6936968,73.6847761,17z/",
    "https://www.facebook.com/SupremeUniversal/",
    "https://www.instagram.com/supremeuniversal/"
  ],
  "areaServed": [`;

content = content.replace('"areaServed": [', sameAsInjection);

fs.writeFileSync(targetFile, content);
console.log("LocalBusiness sameAs injected.");
