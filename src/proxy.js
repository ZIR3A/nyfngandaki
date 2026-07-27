import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const { auth } = NextAuth(authConfig);

const locales = ["en", "np"];
const defaultLocale = "en";

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  // --- 1. AUTHENTICATION (Admin / Login routes) ---
  const isAuthRoute = pathname.startsWith("/login");
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoggedIn = !!req.auth;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/admin/dashboard", nextUrl));
    }
  } else if (isAdminRoute) {
    if (!isLoggedIn) {
      let callbackUrl = pathname;
      if (nextUrl.search) {
        callbackUrl += nextUrl.search;
      }
      const encodedCallbackUrl = encodeURIComponent(callbackUrl);
      return Response.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
    }
    // Do not run locale logic on admin routes
    return null; 
  }

  // --- 2. LOCALIZATION (Public routes) ---
  // Skip if it's an API, Auth, Admin, or static file route
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/admin") ||
    pathname.includes(".")
  ) {
    return null;
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return null;

  // Redirect if there is no locale
  // Try to get locale from cookie, else use default
  const localeCookie = req.cookies.get("NEXT_LOCALE")?.value;
  const locale = locales.includes(localeCookie) ? localeCookie : defaultLocale;

  return Response.redirect(new URL(`/${locale}${pathname === "/" ? "" : pathname}`, req.url));
});

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
