"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";
import site from "@/data/site.json";
import { toFa } from "@/lib/products";

const links = [
  { href: "/", label: "خانه" },
  { href: "/shop", label: "فروشگاه" },
  { href: "/skin-test", label: "تست نوع پوست" },
  { href: "/authenticity", label: "بررسی اورجینال بودن" },
  { href: "/faq", label: "سوالات پرتکرار" },
  { href: "/about", label: "دربارهٔ ما" },
  { href: "/contact", label: "تماس" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="header">
      <div className="topbar">✨ همهٔ محصولات اورجینال کره‌ای | مشوره رایگان در اینستاگرام</div>
      <div className="container header-row">
        <button className="icon-btn" aria-label="منو" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          {site.name}
        </Link>
        <Link href="/cart" className="icon-btn cart-btn" aria-label="سبد خرید" onClick={() => setOpen(false)}>
          🛍️
          {count > 0 && <span className="badge">{toFa(count)}</span>}
        </Link>
      </div>
      <nav className={`nav ${open ? "nav-open" : ""}`}>
        <div className="container nav-inner">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
