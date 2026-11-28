export const dynamic = "force-static";

export default function robots() {
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/admin/", "/account/", "/api/"] }], sitemap: "https://kbeautyaf.com/sitemap.xml" };
}
