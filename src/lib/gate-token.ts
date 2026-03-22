/**
 * Edge + Node compatible gate cookie value (HMAC-SHA256).
 * Cookie is httpOnly; value is not derivable without the signing secret.
 */

const HMAC_MESSAGE = "portfolio-granted-v1";

function bufferToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBuffer(hex: string): Uint8Array | null {
  if (hex.length % 2 !== 0) return null;
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    const byte = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    if (Number.isNaN(byte)) return null;
    out[i] = byte;
  }
  return out;
}

export async function getExpectedGateCookieValue(
  signingSecret: string,
): Promise<string> {
  const keyRaw = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(signingSecret),
  );
  const key = await crypto.subtle.importKey(
    "raw",
    keyRaw,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(HMAC_MESSAGE),
  );
  return bufferToHex(sig);
}

export function timingSafeEqualHex(a: string, b: string): boolean {
  const bufA = hexToBuffer(a);
  const bufB = hexToBuffer(b);
  if (!bufA || !bufB || bufA.length !== bufB.length) return false;
  let diff = 0;
  for (let i = 0; i < bufA.length; i++) {
    diff |= bufA[i]! ^ bufB[i]!;
  }
  return diff === 0;
}

export const GATE_COOKIE_NAME = "portfolio_site_access";
