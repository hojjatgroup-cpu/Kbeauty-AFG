import posts from "@/data/blog.json";
import PostClient from "./PostClient";

const SITE = "https://kbeauty-afg.pages.dev";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) return { title: "K Beauty AFG" };
  const title = (p.seoTitle && p.seoTitle.fa) || p.title.fa;
  return {
    title: `${title} | K Beauty AFG`,
    description: p.excerpt.fa,
    keywords: p.keywords,
    alternates: { canonical: `${SITE}/blog/${p.slug}/` },
    openGraph: { title, description: p.excerpt.fa, type: "article", images: [`${SITE}${p.cover}`], locale: "fa_AF" },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  const ld = p && {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title.fa,
    description: p.excerpt.fa,
    image: `${SITE}${p.cover}`,
    datePublished: p.date,
    inLanguage: "fa",
    author: { "@type": "Organization", name: "K Beauty AFG" },
    publisher: { "@type": "Organization", name: "K Beauty AFG", logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
  };
  return (
    <>
      {ld && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />}
      <PostClient slug={slug} />
    </>
  );
}
