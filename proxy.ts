import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Halaman yang BOLEH diakses tanpa login
const PUBLIC_PATHS = new Set(["/login"]);

// Cookie session name
const SESSION_COOKIE = "serena_sail_session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Izinkan akses ke halaman publik (login)
  if (PUBLIC_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  // Izinkan akses ke API routes (ditangani oleh auth di route handler masing-masing)
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Cek cookie session untuk semua halaman lainnya
  const sessionCookie = request.cookies.get(SESSION_COOKIE);

  if (!sessionCookie?.value) {
    // Redirect ke login dengan parameter callbackUrl
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.ico|.*\\.webp).*)",
  ],
};
