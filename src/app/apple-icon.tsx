import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon (iPad / iPhone tabs & home screen); PNG is required — SVG favicon alone is often ignored. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          borderRadius: 40,
        }}
      >
        <span
          style={{
            color: "#f0ff00",
            fontSize: 76,
            fontWeight: 800,
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            lineHeight: 1,
            letterSpacing: "-0.06em",
          }}
        >
          EH
        </span>
      </div>
    ),
    { ...size },
  );
}
