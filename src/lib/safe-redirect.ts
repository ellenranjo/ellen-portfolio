/**
 * Prevent open redirects — only same-origin relative paths.
 */
export function safeInternalPath(path: string | null | undefined): string {
  if (!path || typeof path !== "string") return "/";
  if (!path.startsWith("/") || path.startsWith("//")) return "/";
  return path;
}
