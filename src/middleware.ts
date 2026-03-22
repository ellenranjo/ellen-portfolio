import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hasValidGateCookie, isGateEnabled } from "@/lib/site-gate";

export async function middleware(request: NextRequest) {
  if (!isGateEnabled()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/api/site-access")
  ) {
    return NextResponse.next();
  }

  const ok = await hasValidGateCookie((name) =>
    request.cookies.get(name)?.value,
  );
  if (ok) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    /*
     * Match all paths except static assets and Next internals.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm|woff2?)$).*)",
  ],
};
