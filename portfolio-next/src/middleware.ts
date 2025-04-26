import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;

  const isAuthRoute = path === '/login';
  const isProtectedRoute = path.startsWith('/dashboard');

  // Ako je korisnik na početnoj ruti "/"
  if (path === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/about', request.url));
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Ako nije ulogovan i pokušava ući u zaštićenu rutu
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*'],
};
