"use client";

import Link from "next/link";
import { LANGS, LANG_LABEL, LANG_NAME } from "@/lib/i18n";
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
  const [langOpen, setLangOpen] = useState(false);
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
          <div className="lang-wrap">
            <button className="lang-btn" onClick={() => setLangOpen(!langOpen)} aria-label="Language" aria-expanded={langOpen}>
              <svg className="lang-globe" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
              </svg>
              <span className="lang-name">{LANG_NAME[lang]}</span>
              <svg className={`lang-chev ${langOpen ? "up" : ""}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {langOpen && (
              <div className="lang-pop glass">
                {LANGS.map((l) => (
                  <button
                    key={l}
                    className={l === lang ? "active" : ""}
                    onClick={() => {
                      setLang(l);
                      setLangOpen(false);
                    }}
                  >
                    {LANG_NAME[l]}
                  </button>
                ))}
              </div>
            )}
          </div>
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
              {LANGS.map((l) => (
                <button key={l} className={lang === l ? "active" : ""} onClick={() => setLang(l)}>
                  {LANG_NAME[l]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
