import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Extract country from Vercel headers (provided automatically by Vercel edge network)
  const country = request.headers.get('x-vercel-ip-country') || 'IN'; // Default to India if not found

  // Determine currency based on HNI/NRI target regions
  let currency = 'INR';
  if (['US', 'CA'].includes(country)) {
    currency = 'USD';
  } else if (['AE', 'SA', 'QA', 'OM', 'BH', 'KW'].includes(country)) {
    currency = 'AED'; // Middle East NRIs
  } else if (['GB'].includes(country)) {
    currency = 'GBP'; // UK NRIs
  } else if (['SG', 'MY'].includes(country)) {
    currency = 'SGD'; // Southeast Asia
  }

  // Create response
  const response = NextResponse.next();

  // Set cookies for frontend components to consume seamlessly without React hydration errors
  response.cookies.set('user-country', country, { maxAge: 86400, path: '/' });
  response.cookies.set('user-currency', currency, { maxAge: 86400, path: '/' });

  // Add custom headers so backend APIs/analytics can track the geo-source
  response.headers.set('x-user-currency', currency);
  response.headers.set('x-user-country', country);

  return response;
}

// Only run middleware on the main routes, ignore static files, API routes, and images to save edge compute
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.*|robots.txt).*)',
  ],
};
