"use client";

import { useLang } from "@/components/LangProvider";
import PostCard from "@/components/PostCard";
import { getPosts } from "@/lib/blog";

export default function BlogList() {
  const { t } = useLang();
  return (
    <section className="section">
      <div className="container narrow">
        <h1 className="page-title">{t("blog.title")}</h1>
        <p className="muted">{t("blog.sub")}</p>
        <div className="post-list">
          {getPosts().map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
