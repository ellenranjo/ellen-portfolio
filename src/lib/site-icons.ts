import type { Metadata } from "next";

/** Original site mark — file must exist at `public/images/EH.png`. */
const EH_PNG = "/images/EH.png";

/**
 * Favicon + touch icons for all routes (home, case studies, /login, tablets).
 * `apple` supplies rel="apple-touch-icon" for iPad / iPhone Safari & Chrome.
 */
export const siteIcons = {
  icon: [
    { url: EH_PNG, type: "image/png", sizes: "32x32" },
    { url: EH_PNG, type: "image/png", sizes: "192x192" },
  ],
  apple: [{ url: EH_PNG, sizes: "180x180", type: "image/png" }],
  shortcut: EH_PNG,
} satisfies Metadata["icons"];
