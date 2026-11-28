"use client";
import Link from "next/link";
import { useLang } from "@/components/LangProvider";
import SectionTitle from "@/components/SectionTitle";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/lib/wishlist";
import { getAllProducts } from "@/lib/products";

const T = {
  fa: { t: "علاقه‌مندی‌ها", e: "هنوز محصولی را پسند نکرده‌اید. روی ♡ کنار هر محصول بزنید تا اینجا ذخیره شود.", b: "دیدن محصولات" },
  en: { t: "Wishlist", e: "Nothing saved yet. Tap ♡ on any product to keep it here.", b: "Browse products" },
  ko: { t: "위시리스트", e: "아직 저장한 상품이 없습니다. 상품의 ♡를 눌러 저장하세요.", b: "상품 보기" },
};

export default function WishlistClient() {
  const { lang } = useLang();
  const { list } = useWishlist();
  const l = T[lang] || T.fa;
  const items = list.map((s) => getAllProducts().find((p) => p.slug === s)).filter(Boolean);
  return (
    <div className="container page">
      <SectionTitle as="h1" center>{l.t}</SectionTitle>
      {items.length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <p className="muted" style={{ marginBottom: 16 }}>{l.e}</p>
          <Link href="/shop" className="btn btn-ink">{l.b}</Link>
        </div>
      ) : (
        <div className="grid">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
