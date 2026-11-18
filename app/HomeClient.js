"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import HeroVideo from "@/components/HeroVideo";
import { useLang } from "@/components/LangProvider";
import { getBestsellers, usedTypes } from "@/lib/products";
import site from "@/data/site.json";

export default function HomeClient() {
  const [go, setGo] = useState(false);
  const mounted = useRef(Date.now());
  // Texts come in once the video is playing (after the loading star), or after 2.5s at the latest.
  const onVideo = useCallback(() => {
    // wait for the loading star to fade out first
    const wait = Math.max(0, 700 - (Date.now() - mounted.current));
    setTimeout(() => setGo(true), wait + 500);
  }, []);
  useEffect(() => {
    const id = setTimeout(() => setGo(true), 4800);
    return () => clearTimeout(id);
  }, []);
  const { t, types } = useLang();
  const bestsellers = getBestsellers();

  return (
    <>
      <section className={`hero hero-video ${go ? "go" : ""}`}>
        <HeroVideo onPlaying={onVideo} />
        <div className="container hero-content">
          <span className="kicker h-kicker">{t("home.kicker")}</span>
          <h1>
            <span className="h-line">
              <span className="h-inner" style={{ "--d": "0.25s" }}>
                {t("home.title1")}
              </span>
            </span>
            <span className="h-line">
              <span className="h-inner" style={{ "--d": "0.45s" }}>
                {t("home.title2")}
              </span>
            </span>
          </h1>
          <p className="h-sub">{t("home.sub")}</p>
          <div className="hero-actions h-actions">
            <Link href="/shop" className="btn btn-ink">
              {t("home.cta")}
            </Link>
            <Link href="/skin-test" className="btn btn-glass-line">
              {t("home.cta2")}
            </Link>
          </div>
        </div>
        <span className="scroll-hint" aria-hidden="true" />
      </section>


      <section className="section">
        <div className="container">
          <div className="trust">
            {[1, 2, 3, 4].map((n) => (
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
