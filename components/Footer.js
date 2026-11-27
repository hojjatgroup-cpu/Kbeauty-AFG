"use client";

import Link from "next/link";
import { useLang } from "./LangProvider";
import site from "@/data/site.json";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <Link href="/" className="logo">
          <img src="/logo.png" alt="" width="34" height="34" />
          <span className="logo-text">{site.name}</span>
        </Link>
        <p className="muted">{t("tagline")}</p>
        <div className="footer-links">
          <Link href="/shop">{t("nav.shop")}</Link>
          <Link href="/skin-test">{t("nav.skinTest")}</Link>
          <Link href="/authenticity">{t("nav.auth")}</Link>
          <Link href="/blog">{t("nav.blog")}</Link>
          <Link href="/faq">{t("nav.faq")}</Link>
          <Link href="/about">{t("nav.about")}</Link>
          <Link href="/contact">{t("nav.contact")}</Link>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", alignItems: "center" }}>
        <a className="round-btn insta" href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
          </svg>
        </a>
        <a className="round-btn insta" href={`mailto:${site.email}`} aria-label="Email">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="5" width="18" height="14" rx="3" />
            <path d="M4 7l8 6 8-6" />
          </svg>
        </a>
        </div>
        <p className="muted" dir="ltr" style={{ marginTop: 8 }}>{site.email}</p>
        <div className="copyright">
          © {site.name} · {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
