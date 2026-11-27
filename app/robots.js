export const dynamic = "force-static";

export default function robots() {
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: "https://kbeautyaf.com/sitemap.xml" };
}
