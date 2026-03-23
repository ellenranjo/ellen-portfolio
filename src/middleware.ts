import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hasValidGateCookie } from "@/lib/site-gate";

const DEBUG = process.env.SITE_GATE_DEBUG === "1";

function withGateHeaders(res: NextResponse, action: "public" | "allow" | "redirect") {
  res.headers.set("X-Site-Gate-Middleware", "1");
  res.headers.set("X-Site-Gate-Action", action);
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
     * "/" must be listed explicitly — nested `.*` patterns often omit the homepage.
     * Exclude `/_next/*` (RSC, chunks, HMR). Extension rule skips most public static files.
     */
    "/",
    "/((?!_next/|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm|woff2?)$).*)",
  ],
};
