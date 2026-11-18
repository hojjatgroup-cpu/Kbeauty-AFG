import Link from "next/link";
import site from "@/data/site.json";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="logo">{site.name}</div>
          <p className="muted">{site.tagline}</p>
          <a className="btn btn-outline" href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener">
            📷 اینستاگرام: {site.instagram}
          </a>
        </div>
        <div className="footer-links">
          <Link href="/shop">فروشگاه</Link>
          <Link href="/skin-test">تست نوع پوست</Link>
          <Link href="/authenticity">بررسی اورجینال بودن</Link>
          <Link href="/faq">سوالات پرتکرار</Link>
          <Link href="/about">دربارهٔ ما</Link>
          <Link href="/contact">تماس</Link>
        </div>
      </div>
      <div className="container copyright">© {site.name}</div>
    </footer>
  );
}
