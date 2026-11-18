"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import HeroSlider from "@/components/HeroSlider";
import HeroSlider from "@/components/HeroSlider";
import { useLang } from "@/components/LangProvider";
import { getBestsellers, usedTypes } from "@/lib/products";
import site from "@/data/site.json";

export default function HomeClient() {
  const { t, types } = useLang();
  const bestsellers = getBestsellers();
  const banners = site.banners || [];

  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="container hero-content">
          <span className="kicker">{t("home.kicker")}</span>
          <h1>
            {t("home.title1")}
            <br />
            {t("home.title2")}
          </h1>
          <p>{t("home.sub")}</p>
          <div className="hero-actions">
            <Link href="/shop" className="btn btn-ink">
              {t("home.cta")}
            </Link>
            <Link href="/skin-test" className="btn btn-line">
              {t("home.cta2")}
            </Link>
          </div>
        </div>

        {site.slides?.length > 0 && (
          <div className="container hero-slider">
            <HeroSlider slides={site.slides} />
          </div>
        )}

        {banners.length > 0 && (
          <div className="container hero-banners">
            <HeroSlider banners={banners} seconds={site.bannerSeconds || 4.5} />
          </div>
        )}
      </section>

      <section className="section">
        <div className="container">
          <div className="trust">
            {[1, 2, 3].map((n) => (
              <div key={n} className="trust-item">
                <strong>{t(`trust.${n}`)}</strong>
                <span>{t(`trust.${n}t`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle center kicker={t("home.bestKicker")}>
            {t("home.best")}
          </SectionTitle>
          <div className="grid">
            {bestsellers.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="center-row">
            <Link href="/shop" className="link-line">
              {t("home.all")}
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle center kicker={t("home.catKicker")}>
            {t("home.cat")}
          </SectionTitle>
          <div className="cats">
            {Object.entries(usedTypes(types)).map(([key, label]) => (
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
            <span className="kicker">{t("home.testKicker")}</span>
            <h2>{t("home.test")}</h2>
            <p>{t("home.testSub")}</p>
            <Link href="/skin-test" className="btn btn-ink">
              {t("home.testCta")}
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <SectionTitle center kicker={t("home.instaKicker")}>
            {t("home.insta")}
          </SectionTitle>
          <a className="link-line" href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener" dir="ltr">
            @{site.instagram}
          </a>
        </div>
      </section>
    </>
  );
}
