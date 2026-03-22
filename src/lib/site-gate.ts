import {
  GATE_COOKIE_NAME,
  getExpectedGateCookieValue,
  timingSafeEqualHex,
} from "@/lib/gate-token";

export function getSitePassword(): string {
  return process.env.SITE_PASSWORD?.trim() ?? "";
}

/** Prefer dedicated secret; fall back when only `SITE_PASSWORD` is set. */
export function getSigningSecret(): string {
  const explicit = process.env.SITE_ACCESS_SECRET?.trim();
  if (explicit) return explicit;
  const pw = getSitePassword();
  return pw ? `${pw}::portfolio-gate-signing` : "";
}

export function isGateEnabled(): boolean {
  return Boolean(getSitePassword());
}

/**
 * True when the gate is off, or the request has a valid httpOnly gate cookie.
 */
export async function hasValidGateCookie(
  getCookie: (name: string) => string | undefined,
): Promise<boolean> {
  if (!isGateEnabled()) return true;
  const signingSecret = getSigningSecret();
  if (!signingSecret) return false;

  const cookie = getCookie(GATE_COOKIE_NAME);
  if (!cookie) return false;

  const expected = await getExpectedGateCookieValue(signingSecret);
  return timingSafeEqualHex(cookie, expected);
}
