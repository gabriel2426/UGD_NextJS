import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes yang butuh autentikasi (tanpa login tidak bisa akses via URL bar)
const PROTECTED_PREFIXES = [
  "/admin",
  "/dashboard",
  "/fleet",
  "/analytics",
  "/live-tracking",
  "/logistic-optimization",
  "/map",
  "/profile",
  "/vessel-deployment",
];

// Cookie session name
const SESSION_COOKIE = "serena_sail_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cek apakah route butuh proteksi
  const needsAuth = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (!needsAuth) {
    return NextResponse.next();
  }

  // Cek cookie session
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
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.css|.*\\.js).*)",
  ],
};
