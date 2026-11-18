import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import Banner from "@/components/Banner";
import { getBestsellers, PRODUCT_TYPES } from "@/lib/products";
import site from "@/data/site.json";

const trust = [
  { title: "اورجینال", text: "اصل و قابل بررسی" },
  { title: "ارسال", text: "[شهرها و زمان ارسال]" },
  { title: "مشوره", text: "رایگان، پیش از خرید" },
];

export default function Home() {
  const bestsellers = getBestsellers();
  const banners = site.banners || [];

  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="container hero-content">
          <span className="kicker">مراقبت پوست کره‌ای</span>
          <h1>
            پوست تو،
            <br />
            مراقبت اورجینال
          </h1>
          <p>بهترین برندهای کره‌ای، انتخاب‌شده برای نوع پوست تو.</p>
          <div className="hero-actions">
            <Link href="/shop" className="btn btn-ink">
              مشاهدهٔ محصولات
            </Link>
            <Link href="/skin-test" className="btn btn-line">
              نوع پوستم چیست؟
            </Link>
          </div>
        </div>

        {banners.length > 0 && (
          <div className="container hero-banners">
            {banners.map((b) => (
              <Banner key={b.image} banner={b} />
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <div className="container">
          <div className="trust">
            {trust.map((t) => (
              <div key={t.title} className="trust-item">
                <strong>{t.title}</strong>
                <span>{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle center kicker="انتخاب‌های ما">
            پرفروش‌ها
          </SectionTitle>
          <div className="grid">
            {bestsellers.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="center-row">
            <Link href="/shop" className="link-line">
              مشاهدهٔ همهٔ محصولات
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle center kicker="دسته‌بندی">
            خرید بر اساس محصول
          </SectionTitle>
          <div className="cats">
            {Object.entries(PRODUCT_TYPES).map(([key, label]) => (
              <Link key={key} href={`/shop?type=${key}`} className="cat">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="soft-banner">
            <span className="kicker">۴ سوال، ۱ دقیقه</span>
            <h2>نوع پوستت را بشناس</h2>
            <p>و محصولاتی را ببین که برای پوست تو مناسب‌اند.</p>
            <Link href="/skin-test" className="btn btn-ink">
              شروع تست
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <SectionTitle center kicker="اینستاگرام">
            همراه ما باش
          </SectionTitle>
          <a className="link-line" href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener">
            @{site.instagram}
          </a>
        </div>
      </section>
    </>
  );
}
