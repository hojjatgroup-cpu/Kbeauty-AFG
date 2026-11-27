import products from "@/data/products.json";
import posts from "@/data/blog.json";

export const dynamic = "force-static";
const SITE = "https://kbeautyaf.com";

export default function sitemap() {
  const pages = ["", "shop", "blog", "skin-test", "faq", "about", "contact", "authenticity"].map((p) => ({
    url: `${SITE}/${p ? p + "/" : ""}`,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7,
  }));
  return [
    ...pages,
    ...products.map((p) => ({ url: `${SITE}/product/${p.slug}/`, changeFrequency: "weekly", priority: 0.8 })),
    ...posts.map((p) => ({ url: `${SITE}/blog/${p.slug}/`, lastModified: p.date, changeFrequency: "monthly", priority: 0.6 })),
  ];
}
