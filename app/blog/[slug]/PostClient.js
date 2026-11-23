"use client";

import Link from "next/link";
import { useLang } from "@/components/LangProvider";
import { getPost, pick } from "@/lib/blog";
import { num } from "@/lib/products";

export default function PostClient({ slug }) {
  const { t, lang } = useLang();
  const post = getPost(slug);
  if (!post) return null;
  const blocks = pick(post.body, lang) || [];

  return (
    <article className="section">
      <div className="container narrow post">
        <Link href="/blog" className="crumb">
          {t("blog.back")}
        </Link>
        <h1 className="page-title">{pick(post.title, lang)}</h1>
        <p className="post-meta">{t("blog.min", { n: num(post.readMin, lang) })}</p>
        <div className="post-hero glass">
          <img src={post.cover} alt="" width="720" height="720" />
        </div>
        {blocks.map((b, i) =>
          b.h ? (
            <h2 key={i}>{b.h}</h2>
          ) : b.ul ? (
            <ul key={i}>
              {b.ul.map((li, k) => (
                <li key={k}>{li}</li>
              ))}
            </ul>
          ) : (
            <p key={i}>{b.p}</p>
          )
        )}
        {post.cta && (
          <div className="post-cta">
            <Link href={post.cta.href} className="btn btn-ink">
              {pick(post.cta.label, lang)}
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
