/**
 * Canonical origin for absolute URLs (OG images, sitemap, robots, canonical
 * links). Override with NEXT_PUBLIC_SITE_URL when deploying to a custom domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-manu-co.vercel.app"
).replace(/\/$/, "");
