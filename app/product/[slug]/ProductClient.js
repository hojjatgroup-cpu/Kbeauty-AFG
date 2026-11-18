"use client";

import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";
import site from "@/data/site.json";
import SectionTitle from "@/components/SectionTitle";
import { useLang } from "@/components/LangProvider";
import { getProduct, getRelated, formatPrice, num } from "@/lib/products";
import { pf } from "@/lib/i18n";

export default function ProductClient({ slug }) {
  const { t, lang, skins, types } = useLang();
  const product = getProduct(slug);
  const related = getRelated(product, 4);
  const benefits = pf(product, "benefits", lang) || [];
  const steps = pf(product, "steps", lang) || [];
  const full = pf(product, "fullIngredients", lang);
  const size = pf(product, "size", lang);

  return (
    <div className="container page">
      <div className="breadcrumb">
        <Link href="/">{t("p.home")}</Link> / <Link href="/shop">{t("nav.shop")}</Link> /{" "}
        <Link href={`/shop?type=${product.type}`}>{types[product.type]}</Link>
      </div>

      <section className="phero">
        <div className="glass phero-img">
          <ProductImage product={product} large />
        </div>
        <div className="phero-info">
          <div className="pcard-brand">{product.brand}</div>
          <h1>{pf(product, "name", lang)}</h1>
          <p className="muted">{pf(product, "short", lang)}</p>
          <div className="pills">
            {product.skin.map((s) => (
              <span key={s} className="pill pill-outline">
                {lang === "fa" ? `${t("p.skin")} ${skins[s]}` : `${skins[s]} ${t("p.skin")}`}
              </span>
            ))}
            <span className="pill pill-outline">{types[product.type]}</span>
            <span className="pill pill-outline">{size}</span>
          </div>
          <div className="glass buybox">
            <div className="buybox-price">
              <span className="muted">{t("p.price")}</span>
              <strong>{formatPrice(product.price, lang)}</strong>
            </div>
            <AddToCartButton slug={product.slug} />
            <Link href="/cart" className="btn btn-line btn-block">
              {t("cart.title")}
            </Link>
            <a className="hint-link" href={`https://ig.me/m/${site.instagram}`} target="_blank" rel="noopener">
              {t("p.question")}
            </a>
          </div>
        </div>
      </section>

      {benefits.length > 0 && (
        <section className="section">
          <SectionTitle>{t("p.why")}</SectionTitle>
          <div className="stack">
            {benefits.map((b) => (
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
          <SectionTitle>{t("p.key")}</SectionTitle>
          <div className="ing-grid">
            {product.keyIngredients.map((i) => (
              <div key={i.name} className="glass ing-card">
                <h3>{pf(i, "name", lang)}</h3>
                <p>{pf(i, "desc", lang)}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {steps.length > 0 && (
        <section className="section">
          <SectionTitle>{t("p.how")}</SectionTitle>
          <div className="stack">
            {steps.map((s, idx) => (
              <div key={s} className="glass step">
                <span className="step-num">{num(idx + 1, lang)}</span>
                <p>{s}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <SectionTitle>{t("p.specs")}</SectionTitle>
        <div className="glass specs">
          <div>
            <span>{t("p.brand")}</span>
            <strong dir="ltr">{product.brand}</strong>
          </div>
          <div>
            <span>{t("p.size")}</span>
            <strong>{size}</strong>
          </div>
          <div>
            <span>{t("p.category")}</span>
            <strong>{types[product.type]}</strong>
          </div>
          <div>
            <span>{t("p.origin")}</span>
            <strong>{t("p.korea")}</strong>
          </div>
        </div>
      </section>

      {full && (
        <section className="section">
          <SectionTitle>{t("p.full")}</SectionTitle>
          <div className="glass text-box">
            <p>{full}</p>
          </div>
          <p className="note">{t("p.patch")}</p>
        </section>
      )}

      <section className="section">
        <SectionTitle>{t("p.related")}</SectionTitle>
        <div className="grid">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
