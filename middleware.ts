// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Maintenance mode
 * Enable by setting env MAINTENANCE_MODE=true (or '1').
 * Allows: /maintenance, /login, /admin, /api/auth/**, assets and Next internals.
 * Everything else is rewritten to /maintenance.
 */
export async function middleware(req: NextRequest) {
  const enabled =
    process.env.MAINTENANCE_MODE === 'true' ||
    process.env.MAINTENANCE_MODE === '1';
  if (!enabled) return NextResponse.next();

  const { pathname } = req.nextUrl;

  // Always allow Next internals & static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/images') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Auth routes must always work for magic links
  if (pathname.startsWith('/api/auth')) return NextResponse.next();

  // Allow admin & login to keep working while site is down
  if (pathname.startsWith('/admin')) return NextResponse.next();
  if (pathname === '/login') return NextResponse.next();

  // Allow the maintenance page itself
  if (pathname === '/maintenance') return NextResponse.next();

  // Everything else -> maintenance
  const url = req.nextUrl.clone();
  url.pathname = '/maintenance';
  return NextResponse.rewrite(url);
}

// Run on all paths except Next internals (extra safety handled at runtime too)
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
