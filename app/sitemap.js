import products from "@/data/products.json";
import posts from "@/data/blog.json";

export const dynamic = "force-static";
const SITE = "https://kbeautyaf.com";
const NOW = new Date().toISOString();

export default function sitemap() {
  const pages = ["", "shop", "blog", "skin-test", "faq", "about", "contact", "authenticity"].map((p) => ({
    url: `${SITE}/${p ? p + "/" : ""}`,
    lastModified: NOW,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7,
  }));
  return [
    ...pages,
    ...products.map((p) => ({ url: `${SITE}/product/${p.slug}/`, lastModified: NOW, images: p.image ? [`${SITE}${p.image}`] : undefined, changeFrequency: "weekly", priority: 0.8 })),
    ...posts.map((p) => ({ url: `${SITE}/blog/${p.slug}/`, lastModified: p.date, changeFrequency: "monthly", priority: 0.6 })),
  ];
}
