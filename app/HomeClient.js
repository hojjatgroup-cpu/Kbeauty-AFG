"use client";

import Link from "next/link";
import { getAllProducts, useCallback, useEffect, useRef, useState } from "react";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import HeroVideo from "@/components/HeroVideo";
import Icon from "@/components/Icons";
import BrandCarousel from "@/components/BrandCarousel";
import BestSlider from "@/components/BestSlider";
import Wheel from "@/components/Wheel";
import Reviews from "@/components/Reviews";
import PostCard from "@/components/PostCard";
import { getPosts } from "@/lib/blog";
import { useLang } from "@/components/LangProvider";
import { getAllProducts, getBestsellers, usedTypes } from "@/lib/products";
import site from "@/data/site.json";

// one real product photo per category (from public/products/thumb)
const CAT_PHOTO = {
  cleanser: "cosrx-low-ph-cleanser",
  toner: "anua-heartleaf-77-toner",
  serum: "torriden-dive-in-serum",
  cream: "dr-althea-345-relief-cream",
  sunscreen: "boj-relief-sun-aqua-fresh",
  mask: "",
  hair: "lilyeve-grow-turn-exosome-ampoule",
  body: "medicube-glow-vanilla-mist",
};

// thumbnail of the chosen product, or of the first product in that category
function catPhoto(type) {
  const all = getAllProducts();
  const p = all.find((x) => x.image.includes(CAT_PHOTO[type] || "@")) || all.find((x) => x.type === type);
  return p ? p.image.replace("/products/", "/products/thumb/") : "/logo.png";
}

export default function HomeClient() {
  const [go, setGo] = useState(false);
  const mounted = useRef(Date.now());
  // Texts come in once the video is playing (after the loading star), or after 2.5s at the latest.
  // Texts come in ~2s after the video shows (or 3.5s at the latest, e.g. if autoplay is blocked)
  const started = useRef(false);
  const onVideo = useCallback(() => {
    if (started.current) return;
    started.current = true;
    setTimeout(() => setGo(true), 2000);
  }, []);
  useEffect(() => {
    window.addEventListener("hero-video-ready", onVideo);
    const id = setTimeout(() => setGo(true), 3500);
    return () => {
      clearTimeout(id);
      window.removeEventListener("hero-video-ready", onVideo);
    };
  }, [onVideo]);
  const { t, types, lang } = useLang();
  const dir = lang === "fa" ? "rtl" : "ltr";
  const bestsellers = getBestsellers();

  return (
    <>
      <section className={`hero hero-video ${go ? "go" : ""}`}>
        <HeroVideo onPlaying={onVideo} />
        <div className="container hero-content">
          <span className="kicker h-kicker">{t("home.kicker")}</span>
          <h1>
            <span className="h-line">
              <span className="h-inner" style={{ "--d": "0.15s" }}>
                {t("home.title1")}
              </span>
            </span>
            <span className="h-line">
              <span className="h-inner" style={{ "--d": "0.3s" }}>
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
        <button
          className="scroll-cue"
          onClick={() => document.getElementById("after-hero")?.scrollIntoView({ behavior: "smooth" })}
          aria-label={t("home.scroll")}
        >
          <span className="scroll-cue-ring">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
            <svg className="second" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </button>
      </section>


      <section className="section" id="after-hero">
        <div className="container">
          <div className="trust">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="trust-item">
                <span className="trust-ico">
                  <Icon name={["original", "delivery", "consult", "support"][n - 1]} />
                </span>
                <strong>{t(`trust.${n}`)}</strong>
                <span>{t(`trust.${n}t`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-show">
        <div className="container">
          <BestSlider products={bestsellers} dir={dir} title={t("home.best")} />
          <div className="center-row">
            <Link href="/shop" className="link-line">
              {t("home.all")}
            </Link>
          </div>
        </div>
      </section>

      <Reviews kicker={t("home.revKicker")} title={t("home.rev")} />
      <section className="section">
        <div className="container">
          <SectionTitle center kicker={t("home.catKicker")}>
            {t("home.cat")}
          </SectionTitle>
          <Wheel
            dir={dir}
            items={Object.entries(usedTypes(types)).map(([key, label]) => ({
              key,
              href: `/shop?type=${key}`,
              label,
              node: (
                <img
                  className="wheel-photo"
                  src={catPhoto(key)}
                  alt={label}
                  width="420"
                  height="420"
                  loading="lazy"
                  draggable="false"
                />
              ),
            }))}
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle center kicker={t("home.brandKicker")}>
            {t("home.brand")}
          </SectionTitle>
          <BrandCarousel dir={dir} />
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
        <div className="container">
          <SectionTitle center kicker={t("home.blogKicker")}>
            {t("home.blog")}
          </SectionTitle>
          <div className="post-list">
            {getPosts()
              .slice(0, 2)
              .map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
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
