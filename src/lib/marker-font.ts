import { Permanent_Marker } from "next/font/google";

/** Shared so the homepage HTML preloads this font before the writing animation hydrates. */
export const markerFont = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});
