import posts from "@/data/blog.json";

export const getPosts = () => [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
export const getPost = (slug) => posts.find((p) => p.slug === slug);
// Korean falls back to English when an article has no Korean text yet
export const pick = (obj, lang) => (obj && (obj[lang] ?? (lang === "fa" ? obj.fa : obj.en ?? obj.fa))) || "";
