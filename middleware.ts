// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

/**
 * Minimal middleware:
 * - Protects only /admin/** routes
 * - Explicitly ignores /api/auth/** and everything else
 * - No interference with POST requests for NextAuth (prevents 405 during magic-link)
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow all NextAuth routes (sign-in, callback, etc.)
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Protect /admin/*
  if (pathname.startsWith('/admin')) {
    const token = await getToken({ req });
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('callbackUrl', req.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Only run on /admin/** and /api/auth/** (we early-return for /api/auth/**)
  matcher: ['/admin/:path*', '/api/auth/:path*'],
};
