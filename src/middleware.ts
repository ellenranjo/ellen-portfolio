import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hasValidGateCookie } from "@/lib/site-gate";

const DEBUG = process.env.SITE_GATE_DEBUG === "1";

function withGateHeaders(res: NextResponse, action: "public" | "allow" | "redirect") {
  res.headers.set("X-Site-Gate-Middleware", "1");
  res.headers.set("X-Site-Gate-Action", action);

  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  return res;
}

/**
 * Fail-closed: always runs for matched routes. Unauthenticated users → /login.
 * Set `SITE_PASSWORD` (+ optional `SITE_ACCESS_SECRET`) in Vercel env or no one can sign in.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* Public: password UI + auth API (cookie issued without prior cookie) */
  if (
    pathname === "/login" ||
    pathname.startsWith("/login/") ||
    pathname === "/api/site-access" ||
    pathname.startsWith("/api/site-access/")
  ) {
    if (DEBUG) {
      console.info("[site-gate] public route", pathname);
    }
    return withGateHeaders(NextResponse.next(), "public");
  }

  const ok = await hasValidGateCookie((name) =>
    request.cookies.get(name)?.value,
  );
  if (ok) {
    if (DEBUG) {
      console.info("[site-gate] allow", pathname);
    }
    return withGateHeaders(NextResponse.next(), "allow");
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.searchParams.set("from", pathname);

  if (DEBUG) {
    console.info("[site-gate] redirect → /login", { from: pathname });
  }

  return withGateHeaders(NextResponse.redirect(loginUrl), "redirect");
}

export const config = {
  matcher: [
    /*
     * Match ALL routes except:
     * - static files
     * - login page
     * - api routes
     */
    '/((?!_next|favicon\\.ico|images|login|api|Ellen-Huynh-Resume\\.pdf).*)',
  ],
};
