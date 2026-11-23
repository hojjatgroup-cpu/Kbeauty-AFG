import posts from "@/data/blog.json";
import PostClient from "./PostClient";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  return { title: p ? `${p.title.fa} | K Beauty AFG` : "K Beauty AFG", description: p?.excerpt?.fa };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  return <PostClient slug={slug} />;
}
