import type { MetadataRoute } from "next";
import { profile } from "@/lib/data";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — Web Developer & Software Developer`,
    short_name: profile.name,
    description: profile.intro,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
