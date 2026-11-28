"use client";
import { useWishlist } from "@/lib/wishlist";
import { useLang } from "./LangProvider";

const L = { fa: ["افزودن به علاقه‌مندی‌ها", "حذف از علاقه‌مندی‌ها"], en: ["Add to wishlist", "Remove from wishlist"], ko: ["위시리스트에 추가", "위시리스트에서 삭제"] };

export default function WishButton({ slug, big = false }) {
  const { has, toggle } = useWishlist();
  const { lang } = useLang();
  const on = has(slug);
  return (
    <button
      type="button"
      className={`wish-btn ${big ? "wish-big" : ""} ${on ? "on" : ""}`}
      aria-pressed={on}
      aria-label={(L[lang] || L.fa)[on ? 1 : 0]}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
    >
      <svg width={big ? 22 : 17} height={big ? 22 : 17} viewBox="0 0 24 24" fill={on ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20Z" />
      </svg>
    </button>
  );
}
