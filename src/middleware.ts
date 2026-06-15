import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/images')) return NextResponse.next();
  if (pathname === '/') return NextResponse.redirect(new URL('/en', request.url));
  if (!['en', 'zh'].includes(pathname.split('/')[1])) return NextResponse.redirect(new URL('/en', request.url));
  return NextResponse.next();
}

export const config = { matcher: ['/((?!_next|api|images|favicon.ico|sitemap.xml|robots.txt|ads.txt).*)'] };
