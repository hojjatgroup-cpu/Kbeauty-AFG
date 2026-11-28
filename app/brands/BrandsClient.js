"use client";
import Link from "next/link";
import { useLang } from "@/components/LangProvider";
import SectionTitle from "@/components/SectionTitle";
import brands from "@/data/brands.json";
import { getAllProducts, num } from "@/lib/products";

const T = { fa: "برندها", en: "Brands", ko: "브랜드" };
const N = { fa: "محصول", en: "products", ko: "개 상품" };

export default function BrandsClient() {
  const { lang } = useLang();
  const all = getAllProducts();
  return (
    <div className="container page">
      <SectionTitle as="h1" center>{T[lang] || T.fa}</SectionTitle>
      <div className="tile-grid">
        {brands.map((b) => (
          <Link key={b.slug} href={`/shop?brand=${b.slug}`} className="tile brand">
            <img src={b.logo} alt={b.name} width="300" height="150" loading="lazy" />
            <span dir="ltr">{b.name}</span>
            <small>
              {num(all.filter((p) => b.match.includes(p.brand)).length, lang)} {N[lang] || N.fa}
            </small>
          </Link>
        ))}
      </div>
    </div>
  );
}
