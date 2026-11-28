"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "./LangProvider";
import { useWishlist } from "@/lib/wishlist";

const L = {
  fa: { home: "خانه", cat: "دسته‌ها", brand: "برندها", wish: "علاقه‌مندی", acc: "حساب من" },
  en: { home: "Home", cat: "Categories", brand: "Brands", wish: "Wishlist", acc: "Account" },
  ko: { home: "홈", cat: "카테고리", brand: "브랜드", wish: "위시리스트", acc: "마이" },
};

const I = {
  home: <path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5H15v-5.5H9v5.5H5.5A1.5 1.5 0 0 1 4 19Z" />,
  cat: (
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="2" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="2" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="2" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="3.25" />
    </>
  ),
  brand: (
    <>
      <path d="M4 12.6V5.5A1.5 1.5 0 0 1 5.5 4h7.1l7.4 7.4a1.5 1.5 0 0 1 0 2.1l-6.5 6.5a1.5 1.5 0 0 1-2.1 0Z" />
      <circle cx="8.6" cy="8.6" r="1.4" />
    </>
  ),
  wish: <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20Z" />,
  acc: (
    <>
      <circle cx="12" cy="8.5" r="3.6" />
      <path d="M5 20c.8-3.6 3.6-5.6 7-5.6s6.2 2 7 5.6" />
    </>
  ),
};

export default function BottomNav() {
  const path = usePathname() || "/";
  const { lang } = useLang();
  const { list } = useWishlist();
  const l = L[lang] || L.fa;
  const items = [
    ["home", "/"],
    ["cat", "/categories/"],
    ["brand", "/brands/"],
    ["wish", "/wishlist/"],
    ["acc", "/account/"],
  ];
  const active = (href) => (href === "/" ? path === "/" : path.startsWith(href.replace(/\/$/, "")));
  return (
    <nav className="bnav" aria-label="menu">
      {items.map(([k, href]) => (
        <Link key={k} href={href} className={`bnav-i ${active(href) ? "on" : ""}`}>
          <span className="bnav-ic">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              {I[k]}
            </svg>
            {k === "wish" && list.length > 0 && <span className="bnav-dot">{list.length}</span>}
          </span>
          <span className="bnav-t">{l[k]}</span>
        </Link>
      ))}
    </nav>
  );
}
