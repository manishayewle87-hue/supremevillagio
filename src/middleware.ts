import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Extract country from Vercel Edge Geo IP headers (fallback to 'IN' for local dev)
  const country = request.geo?.country || request.headers.get('x-vercel-ip-country') || 'IN';
  
  // Clone the request headers and append our custom geo header
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-country', country);

  // If the user is from UAE, US, UK, Singapore, Australia etc., flag them as NRI
  const isNRI = ['AE', 'US', 'GB', 'SG', 'AU', 'CA'].includes(country);
  requestHeaders.set('x-is-nri', isNRI ? 'true' : 'false');

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Also set a secure cookie so client components can read the NRI status instantly
  response.cookies.set('nri_status', isNRI ? 'true' : 'false', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return response;
}

export const config = {
  // Match all request paths except for the ones starting with:
  // - api (API routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.*|merchant-feed.*|llms.txt|robots.txt).*)',
  ],
};
