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
  const title = `${p.name} ${p.brand}${p.name_en ? ` | ${p.name_en}` : ""}`;
  const description = `${p.short} قیمت: ${p.price.toLocaleString("fa-AF")} افغانی. محصول اورجینال کره‌ای، ارسال به همهٔ ولایات افغانستان.`;
  return {
    title,
    description,
    alternates: { canonical: `/product/${p.slug}/` },
    openGraph: { type: "website", title, description, url: `/product/${p.slug}/`, images: p.image ? [{ url: p.image, width: 720, height: 720, alt: title }] : undefined },
  };
}

function productLd(p) {
  const SITE = "https://kbeautyaf.com";
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${p.brand} ${p.name_en || p.name}`,
    alternateName: p.name,
    image: p.image ? [`${SITE}${p.image}`] : undefined,
    description: p.short,
    brand: { "@type": "Brand", name: p.brand },
    sku: p.slug,
    offers: {
      "@type": "Offer",
      url: `${SITE}/product/${p.slug}/`,
      priceCurrency: "AFN",
      price: p.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${SITE}/#store` },
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd(p)) }} />
      <ProductClient slug={slug} />
    </>
  );
}
