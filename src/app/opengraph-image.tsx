import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.tagline}`;

/**
 * Social share card. Rendered at build time and served from
 * /opengraph-image, and wired into the metadata automatically by Next.
 * Uses the same near-black/gold palette as the site.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#f5f5f0",
          padding: "72px",
          borderTop: "8px solid #c9a84c",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 12, color: "#c9a84c" }}>
          {profile.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 66, lineHeight: 1.1, letterSpacing: -1 }}>
            Web Developer &amp; Software Developer
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#8a8a8a" }}>
            {profile.intro}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#8a8a8a",
          }}
        >
          <span>{profile.tagline}</span>
          <span style={{ color: "#c9a84c" }}>Available worldwide</span>
        </div>
      </div>
    ),
    size,
  );
}
