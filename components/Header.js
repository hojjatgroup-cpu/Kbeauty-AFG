"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLang } from "./LangProvider";
import { useCart } from "./CartProvider";
import { num } from "@/lib/products";
import site from "@/data/site.json";

const links = [
  { href: "/", key: "nav.home" },
  { href: "/shop", key: "nav.shop" },
  { href: "/authenticity", key: "nav.auth" },
  { href: "/faq", key: "nav.faq" },
  { href: "/about", key: "nav.about" },
  { href: "/contact", key: "nav.contact" },
];

function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export default function Header() {
  const { t, lang, setLang } = useLang();
  const { count } = useCart();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [q, setQ] = useState("");

  const close = () => setOpen(false);
  const submit = (e) => {
    e.preventDefault();
    const query = q.trim();
    setSearching(false);
    setOpen(false);
    router.push(query ? `/shop/?q=${encodeURIComponent(query)}` : "/shop/");
  };

  return (
    <header className="header">
      <div className="container header-row">
        <Link href="/" className="logo" onClick={close}>
          <img src="/logo.png" alt="" width="34" height="34" />
          <span className="logo-text">{site.name}</span>
        </Link>

        <nav className="nav-desktop">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {t(l.key)}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="round-btn"
            aria-label={t("nav.search")}
            onClick={() => {
              setSearching(!searching);
              setOpen(false);
            }}
          >
            <SearchIcon />
          </button>
          <Link href="/cart" className="round-btn cart-btn" aria-label={t("cart.title")} onClick={close}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {count > 0 && <span className="badge">{num(count, lang)}</span>}
          </Link>
          <button className="lang-btn" onClick={() => setLang(lang === "fa" ? "en" : "fa")} aria-label="Language">
            {lang === "fa" ? "EN" : "فا"}
          </button>
          <button
            className="round-btn menu-btn"
            aria-label={t("nav.menu")}
            onClick={() => {
              setOpen(!open);
              setSearching(false);
            }}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {searching && (
        <div className="search-panel">
          <form className="container search-form" onSubmit={submit}>
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("search.placeholder")} />
            <button type="submit" className="btn btn-ink btn-sm">
              {t("search.go")}
            </button>
          </form>
        </div>
      )}

      {open && (
        <div className="menu-panel">
          <div className="container">
            <Link href="/skin-test" className="btn btn-ink btn-block" onClick={close}>
              {t("nav.skinTest")}
            </Link>
            <div className="menu-links">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={close}>
                  {t(l.key)}
                </Link>
              ))}
            </div>
            <div className="menu-lang">
              <button className={lang === "fa" ? "active" : ""} onClick={() => setLang("fa")}>
                فارسی
              </button>
              <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>
                English
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
