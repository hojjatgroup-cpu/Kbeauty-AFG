import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getBestsellers, PRODUCT_TYPES, TYPE_ICONS } from "@/lib/products";
import site from "@/data/site.json";

const trust = [
  { icon: "✅", title: "۱۰۰٪ اورجینال", text: "محصولات اصل کره‌ای" },
  { icon: "🚚", title: "ارسال", text: "[شهرها و زمان ارسال]" },
  { icon: "💬", title: "مشورهٔ رایگان", text: "انتخاب محصول مناسب پوستت" },
  { icon: "🔍", title: "قابل بررسی", text: "راهنمای تشخیص اصل بودن" },
];

export default function Home() {
  const bestsellers = getBestsellers();

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <h1>
              مراقبت پوست به سبک کره‌ای،
              <br />
              اورجینال و مطمئن
            </h1>
            <p>بهترین برندهای کره‌ای شوینده، ضدآفتاب، سرم، کرم و ماسک، انتخاب‌شده برای نوع پوست تو.</p>
            <div className="hero-actions">
              <Link href="/shop" className="btn btn-primary">
                مشاهدهٔ محصولات
              </Link>
              <Link href="/skin-test" className="btn btn-outline">
                نوع پوستم چیست؟
              </Link>
            </div>
          </div>
          <div className="hero-art">🌸</div>
        </div>
      </section>

      <section className="section">
        <div className="container trust">
          {trust.map((t) => (
            <div key={t.title} className="trust-item">
              <div className="trust-icon">{t.icon}</div>
              <div className="trust-title">{t.title}</div>
              <div className="trust-text">{t.text}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="section-title">دسته‌بندی‌ها</h2>
          <div className="cats">
            {Object.entries(PRODUCT_TYPES).map(([key, label]) => (
              <Link key={key} href={`/shop?type=${key}`} className="cat">
                <span className="cat-circle">{TYPE_ICONS[key]}</span>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">پرفروش‌ها</h2>
            <Link href="/shop" className="link-more">
              همه ←
            </Link>
          </div>
          <div className="grid">
            {bestsellers.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="banner">
            <h2>نمی‌دانی پوستت چه نوعی است؟</h2>
            <p>با ۴ سوال ساده نوع پوستت را بشناس و محصولات مناسب را ببین.</p>
            <Link href="/skin-test" className="btn btn-light">
              شروع تست
            </Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="section-title">ما را در اینستاگرام دنبال کنید</h2>
          <a className="btn btn-outline" href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener">
            📷 {site.instagram}
          </a>
        </div>
      </section>
    </>
  );
}
