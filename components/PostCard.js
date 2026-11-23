"use client";

import Link from "next/link";
import { useLang } from "./LangProvider";
import { pick } from "@/lib/blog";
import { num } from "@/lib/products";

export default function PostCard({ post }) {
  const { t, lang } = useLang();
  return (
    <Link href={`/blog/${post.slug}`} className="post-card glass">
      <div className="post-cover">
        <img src={post.cover} alt="" width="720" height="720" loading="lazy" />
      </div>
      <div className="post-body">
        <span className="post-meta">{t("blog.min", { n: num(post.readMin, lang) })}</span>
        <h3>{pick(post.title, lang)}</h3>
        <p>{pick(post.excerpt, lang)}</p>
        <span className="link-line">{t("blog.read")}</span>
      </div>
    </Link>
  );
}
