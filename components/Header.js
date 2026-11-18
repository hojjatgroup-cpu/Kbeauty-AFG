"use client";

import Link from "next/link";
import { useState } from "react";
import site from "@/data/site.json";

const links = [
  { href: "/", label: "خانه" },
  { href: "/shop", label: "محصولات" },
  { href: "/authenticity", label: "بررسی اورجینال بودن" },
  { href: "/faq", label: "سوالات پرتکرار" },
  { href: "/about", label: "دربارهٔ ما" },
  { href: "/contact", label: "تماس" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="header">
      <div className="container header-row">
        <Link href="/" className="logo" onClick={close}>
          <span className="logo-mark">K</span>
          <span className="logo-text">{site.name}</span>
        </Link>

        <nav className="nav-desktop">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
          <Link href="/skin-test" className="btn btn-primary btn-sm">
            تست نوع پوست
          </Link>
        </nav>

        <button className="round-btn menu-btn" aria-label="منو" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="menu-panel">
          <div className="container">
            <Link href="/skin-test" className="btn btn-primary btn-block" onClick={close}>
              تست نوع پوست
            </Link>
            <div className="menu-links">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={close}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
