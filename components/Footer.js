import Link from "next/link";
import site from "@/data/site.json";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-line" />
      <div className="container footer-inner">
        <Link href="/" className="logo">
          <span className="logo-mark">K</span>
          <span className="logo-text">{site.name}</span>
        </Link>
        <p className="muted">{site.tagline}</p>
        <div className="footer-links">
          <Link href="/shop">محصولات</Link>
          <Link href="/skin-test">تست نوع پوست</Link>
          <Link href="/authenticity">بررسی اورجینال بودن</Link>
          <Link href="/faq">سوالات پرتکرار</Link>
          <Link href="/about">دربارهٔ ما</Link>
          <Link href="/contact">تماس</Link>
        </div>
        <a
          className="round-btn insta"
          href={`https://instagram.com/${site.instagram}`}
          target="_blank"
          rel="noopener"
          aria-label="اینستاگرام"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
          </svg>
        </a>
        <div className="copyright">© {site.name} · تمامی حقوق محفوظ است</div>
      </div>
    </footer>
  );
}
