const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'next.config.ts');
let content = fs.readFileSync(configPath, 'utf8');

// Strip out Vercel caching headers (not supported/needed the same way on CF, though harmless, it's cleaner to remove them to avoid conflicts, or keep them)
// Let's modify the images block to use the custom loader

const newImagesConfig = `  images: {
    loader: 'custom',
    loaderFile: './src/lib/cloudflare-image-loader.ts',
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.supremeuniversal.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.supremeuniversal.com',
      }
    ],
  },`;

content = content.replace(/images: \{[\s\S]*?remotePatterns: \[[\s\S]*?\],\s*\},/m, newImagesConfig);

fs.writeFileSync(configPath, content);
console.log("next.config.ts updated with Cloudflare custom loader.");
