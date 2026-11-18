import Link from "next/link";
import { notFound } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";
import SectionTitle from "@/components/SectionTitle";
import {
  getAllProducts,
  getProduct,
  getRelated,
  formatPrice,
  toFa,
  SKIN_TYPES,
  PRODUCT_TYPES,
} from "@/lib/products";
import site from "@/data/site.json";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return { title: `${p.brand} ${p.name}`, description: p.short };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = getRelated(product, 3);

  return (
    <div className="container page">
      <div className="breadcrumb">
        <Link href="/">خانه</Link> / <Link href="/shop">محصولات</Link> /{" "}
        <Link href={`/shop?type=${product.type}`}>{PRODUCT_TYPES[product.type]}</Link>
      </div>

      <section className="phero">
        <div className="glass phero-img">
          <ProductImage product={product} large />
        </div>
        <div className="phero-info">
          <div className="pcard-brand">{product.brand}</div>
          <h1>{product.name}</h1>
          <p className="muted">{product.short}</p>
          <div className="pills">
            {product.skin.map((s) => (
              <span key={s} className="pill pill-outline">
                پوست {SKIN_TYPES[s]}
              </span>
            ))}
            <span className="pill pill-outline">{PRODUCT_TYPES[product.type]}</span>
            <span className="pill pill-outline">{product.size}</span>
          </div>
          <div className="glass buybox">
            <div className="buybox-price">
              <span className="muted">قیمت</span>
              <strong>{formatPrice(product.price)}</strong>
            </div>
            <AddToCartButton slug={product.slug} />
            <a
              className="btn btn-outline btn-block"
              href={`https://ig.me/m/${site.instagram}`}
              target="_blank"
              rel="noopener"
            >
              سوال دارم؟ پیام در اینستاگرام
            </a>
          </div>
        </div>
      </section>

      {product.benefits?.length > 0 && (
        <section className="section">
          <SectionTitle>چرا این محصول</SectionTitle>
          <div className="stack">
            {product.benefits.map((b) => (
              <div key={b} className="glass check-item">
                <span className="check">✓</span>
                <p>{b}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {product.keyIngredients?.length > 0 && (
        <section className="section">
          <SectionTitle>ترکیبات کلیدی</SectionTitle>
          <div className="ing-grid">
            {product.keyIngredients.map((i) => (
              <div key={i.name} className="glass ing-card">
                <h3>{i.name}</h3>
                <p>{i.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {product.steps?.length > 0 && (
        <section className="section">
          <SectionTitle>روش مصرف</SectionTitle>
          <div className="stack">
            {product.steps.map((s, idx) => (
              <div key={s} className="glass step">
                <span className="step-num">{toFa(idx + 1)}</span>
                <p>{s}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <SectionTitle>مشخصات</SectionTitle>
        <div className="glass specs">
          <div>
            <span>برند</span>
            <strong dir="ltr">{product.brand}</strong>
          </div>
          <div>
            <span>حجم</span>
            <strong>{product.size}</strong>
          </div>
          <div>
            <span>دسته</span>
            <strong>{PRODUCT_TYPES[product.type]}</strong>
          </div>
          <div>
            <span>کشور سازنده</span>
            <strong>کوریای جنوبی</strong>
          </div>
        </div>
      </section>

      {product.fullIngredients && (
        <section className="section">
          <SectionTitle>ترکیبات کامل</SectionTitle>
          <div className="glass text-box">
            <p>{product.fullIngredients}</p>
          </div>
          <p className="note">پیش از استفاده از هر محصول جدید، آن را روی بخش کوچکی از پوست امتحان کنید.</p>
        </section>
      )}

      <section className="section">
        <SectionTitle>محصولات مرتبط</SectionTitle>
        <div className="grid">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
