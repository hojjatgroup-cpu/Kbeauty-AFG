import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import { getBestsellers, PRODUCT_TYPES, TYPE_ICONS } from "@/lib/products";
import site from "@/data/site.json";

const trust = [
  { icon: "✓", title: "۱۰۰٪ اورجینال", text: "فقط محصولات اصل کره‌ای، قابل بررسی با کد و بارکد." },
  { icon: "↗", title: "ارسال", text: "[شهرها و زمان ارسال]" },
  { icon: "♡", title: "مشورهٔ رایگان", text: "قبل از خرید بپرس، با هم روتین مناسب پوستت را پیدا می‌کنیم." },
];

export default function Home() {
  const bestsellers = getBestsellers();

  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="container hero-content">
          <span className="hero-kicker">مراقبت پوست کره‌ای</span>
          <h1>
            پوست تو،
            <br />
            مراقبت اورجینال
          </h1>
          <p>بهترین برندهای کره‌ای، انتخاب‌شده برای نوع پوست تو.</p>
          <div className="hero-actions">
            <Link href="/shop" className="btn btn-glass">
              مشاهدهٔ محصولات
            </Link>
            <Link href="/skin-test" className="btn btn-glass-ghost">
              نوع پوستم چیست؟
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle center>چرا {site.name}؟</SectionTitle>
          <div className="trust">
            {trust.map((t) => (
              <div key={t.title} className="glass trust-item">
                <span className="trust-icon">{t.icon}</span>
                <div>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle>دسته‌بندی‌ها</SectionTitle>
          <div className="cats">
            {Object.entries(PRODUCT_TYPES).map(([key, label]) => (
              <Link key={key} href={`/shop?type=${key}`} className="cat">
                <span className={`cat-circle glass pimg-${key}`}>{TYPE_ICONS[key]}</span>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <SectionTitle>پرفروش‌ها</SectionTitle>
            <Link href="/shop" className="pill pill-outline">
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
            <h2>نوع پوستت را نمی‌دانی؟</h2>
            <p>با ۴ سوال ساده نوع پوستت را بشناس و محصولات مناسب را ببین.</p>
            <Link href="/skin-test" className="btn btn-white">
              شروع تست نوع پوست
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <SectionTitle center sub="سوال داری؟ قبل از خرید در اینستاگرام از ما مشوره بگیر.">
            همراه ما باش
          </SectionTitle>
          <a className="btn btn-outline" href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener">
            اینستاگرام {site.instagram}
          </a>
        </div>
      </section>
    </>
  );
}
