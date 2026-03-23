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

/** True when `SITE_PASSWORD` is set (login can succeed). Does not mean the site is “open”. */
export function isPasswordConfigured(): boolean {
  return Boolean(getSitePassword());
}

/** @deprecated use isPasswordConfigured */
export function isGateEnabled(): boolean {
  return isPasswordConfigured();
}

/**
 * True only when the httpOnly gate cookie matches the server signing secret.
 * Fail-closed: if signing cannot be verified (no secret, bad cookie, etc.) → false.
 * Never returns true just because the password env is missing.
 */
export async function hasValidGateCookie(
  getCookie: (name: string) => string | undefined,
): Promise<boolean> {
  const signingSecret = getSigningSecret();
  if (!signingSecret) {
    return false;
  }

  const cookie = getCookie(GATE_COOKIE_NAME);
  if (!cookie) {
    return false;
  }

  const expected = await getExpectedGateCookieValue(signingSecret);
  return timingSafeEqualHex(cookie, expected);
}
