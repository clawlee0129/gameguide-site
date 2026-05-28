import { NextRequest, NextResponse } from 'next/server';
import { getLangFromHeader } from '@/i18n';

const SUPPORTED_LANGUAGES = ['en', 'zh'] as const;

/**
 * Middleware to handle language routing:
 * - If path already has a valid language prefix, do nothing
 * - If no language prefix, detect from Accept-Language header
 * - Redirect to appropriate language path
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, API routes, and Next.js internal paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/fonts') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if path already has a valid language prefix
  const pathSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];

  if (firstSegment && SUPPORTED_LANGUAGES.includes(firstSegment as typeof SUPPORTED_LANGUAGES[number])) {
    // Already has a valid language prefix, do nothing
    return NextResponse.next();
  }

  // Detect language from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || undefined;
  const detectedLang = getLangFromHeader(acceptLanguage);

  // Build the new URL with language prefix
  const newPathname = pathname === '/' 
    ? `/${detectedLang}`
    : `/${detectedLang}${pathname}`;

  const url = new URL(newPathname, request.url);
  url.search = request.nextUrl.search;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!_next|api|static|images|fonts|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};

// Updated: 2026-05-26 - Phase 3 i18n