export const dynamic = "force-static";

export default function robots() {
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: "https://kbeauty-afg.pages.dev/sitemap.xml" };
}
