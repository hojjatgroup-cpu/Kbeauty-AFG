import Link from "next/link";
import { notFound } from "next/navigation";
import ProductImage from "@/components/ProductImage";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";
import { getAllProducts, getProduct, getRelated, formatPrice, SKIN_TYPES, PRODUCT_TYPES } from "@/lib/products";
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
  const related = getRelated(product);

  return (
    <div className="container">
      <div className="breadcrumb">
        <Link href="/">خانه</Link> / <Link href="/shop">فروشگاه</Link> /{" "}
        <Link href={`/shop?type=${product.type}`}>{PRODUCT_TYPES[product.type]}</Link>
      </div>

      <div className="product">
        <ProductImage product={product} large />
        <div>
          <div className="p-brand">{product.brand}</div>
          <h1 className="p-name">{product.name}</h1>
          <div className="muted">
            {PRODUCT_TYPES[product.type]} · {product.size}
          </div>
          <div className="p-price">{formatPrice(product.price)}</div>
          <p>{product.short}</p>

          <div className="p-tags">
            <span className="muted" style={{ fontSize: 13 }}>
              مناسب پوست:
            </span>
            {product.skin.map((s) => (
              <span key={s} className="tag">
                {SKIN_TYPES[s]}
              </span>
            ))}
          </div>

          <AddToCartButton slug={product.slug} />
          <a
            className="btn btn-outline btn-block"
            style={{ marginTop: 10 }}
            href={`https://ig.me/m/${site.instagram}`}
            target="_blank"
            rel="noopener"
          >
            💬 سوال دارم (اینستاگرام)
          </a>

          <div className="p-box">
            <h3>توضیحات</h3>
            <p>{product.description}</p>
          </div>
          <div className="p-box">
            <h3>ترکیبات مهم</h3>
            <ul>
              {product.ingredients.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
          <div className="p-box">
            <h3>روش استفاده</h3>
            <p>{product.howToUse}</p>
          </div>
          <p className="note">
            پیش از استفاده از هر محصول جدید، آن را روی بخش کوچکی از پوست امتحان کنید. فهرست کامل ترکیبات روی
            بسته‌بندی محصول درج شده است.
          </p>
        </div>
      </div>

      <section className="section">
        <h2 className="section-title">محصولات مشابه</h2>
        <div className="grid">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
