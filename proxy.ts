import { NextResponse, type NextRequest } from 'next/server';

// Trailing-slash redirect (next.config.ts turns off Next's built-in one so moved URLs redirect in
// one hop). Same rule as the built-in: files with an extension and .well-known are left alone.
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.endsWith('/') || /(?:^|\/)[^/]+\.\w+$/.test(pathname) || pathname.startsWith('/.well-known/')) return;
  // Built from the raw URL: NextURL drops the trailing slash when formatting here.
  const url = new URL(req.url);
  url.pathname = `${pathname}/`;
  return NextResponse.redirect(url, 308);
}

export const config = { matcher: '/((?!_next/).*)' };
