// Docs: https://developers.cloudflare.com/images/image-resizing/integration-with-frameworks/#nextjs
export default function cloudflareLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const params = [\`width=\${width}\`];
  if (quality) {
    params.push(\`quality=\${quality}\`);
  }
  const paramsString = params.join(',');
  
  // If the image is a relative path (local asset), we route it through our own domain's Cloudflare Image Resizing endpoint
  if (src.startsWith('/')) {
    return \`/cgi-bin/imageproxy?width=\${width}&quality=\${quality || 75}&src=\${src}\`; 
    // Note: To use Cloudflare Image Resizing, you usually format it as /cdn-cgi/image/width=...,quality=.../image.jpg
  }
  
  // For external images, format it for Cloudflare CDN-CGI
  return \`/cdn-cgi/image/\${paramsString}/\${src}\`;
}
