import { notFound } from "next/navigation";
import ProductClient from "./ProductClient";
import { getAllProducts, getProduct } from "@/lib/products";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return { title: `${p.brand} ${p.name_en || p.name}`, description: p.short };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  if (!getProduct(slug)) notFound();
  return <ProductClient slug={slug} />;
}
