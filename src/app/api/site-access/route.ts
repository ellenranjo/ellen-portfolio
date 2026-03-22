import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { GATE_COOKIE_NAME, getExpectedGateCookieValue } from "@/lib/gate-token";
import {
  getSigningSecret,
  getSitePassword,
} from "@/lib/site-gate";

export async function POST(request: Request) {
  const configured = getSitePassword();
  if (!configured) {
    return NextResponse.json(
      { ok: false, error: "Password gate is not configured." },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, {
      status: 400,
    });
  }

  const password = typeof body.password === "string" ? body.password : "";
  const a = Buffer.from(configured, "utf8");
  const b = Buffer.from(password, "utf8");
  const match =
    a.length === b.length && timingSafeEqual(a, b);

  if (!match) {
    return NextResponse.json({ ok: false, error: "Incorrect password." }, {
      status: 401,
    });
  }

  const signingSecret = getSigningSecret();
  if (!signingSecret) {
    return NextResponse.json(
      { ok: false, error: "Server configuration error." },
      { status: 500 },
    );
  }

  const token = await getExpectedGateCookieValue(signingSecret);
  const res = NextResponse.json({ ok: true });
  const isProd = process.env.NODE_ENV === "production";
  res.cookies.set(GATE_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
