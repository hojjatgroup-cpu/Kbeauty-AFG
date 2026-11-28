"use client";
import Link from "next/link";
import { useLang } from "@/components/LangProvider";
import SectionTitle from "@/components/SectionTitle";
import { getAllProducts, usedTypes, catPhoto, num } from "@/lib/products";

const T = { fa: "دسته‌بندی‌ها", en: "Categories", ko: "카테고리" };
const N = { fa: "محصول", en: "products", ko: "개 상품" };

export default function CategoriesClient() {
  const { lang, types } = useLang();
  const all = getAllProducts();
  return (
    <div className="container page">
      <SectionTitle as="h1" center>{T[lang] || T.fa}</SectionTitle>
      <div className="tile-grid">
        {Object.entries(usedTypes(types)).map(([key, label]) => (
          <Link key={key} href={`/shop?type=${key}`} className="tile">
            <img src={catPhoto(key)} alt={label} width="260" height="260" loading="lazy" />
            <span>{label}</span>
            <small>
              {num(all.filter((p) => p.type === key).length, lang)} {N[lang] || N.fa}
            </small>
          </Link>
        ))}
      </div>
    </div>
  );
}
