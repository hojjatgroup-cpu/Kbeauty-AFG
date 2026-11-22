"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AddToCartButton from "./AddToCartButton";
import { useLang } from "./LangProvider";
import { pf } from "@/lib/i18n";
import { formatPrice, discountPercent, num } from "@/lib/products";

// Showcase slider: one big product at a time on a coloured stage. Swipe or use the arrows.
export default function BestSlider({ products, title, dir = "ltr", every = 4500 }) {
  const { t, lang } = useLang();
  const N = products.length;
  const [i, setI] = useState(0);
  const touch = useRef(null);
  const last = useRef(Date.now());

  const go = (d) => {
    last.current = Date.now();
    setI((x) => (x + d + N) % N);
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() - last.current >= every) setI((x) => (x + 1) % N);
    }, every);
    return () => clearInterval(id);
  }, [N, every]);

  const rtl = dir === "rtl";
  const p = products[i];
  const off = discountPercent(p);

  return (
    <section className="show" aria-roledescription="carousel">
      <span className="show-sparkle" aria-hidden="true" />
      <h2 className="show-title">{title}</h2>
      <div
        className="show-stage"
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touch.current == null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          touch.current = null;
          if (Math.abs(dx) < 35) return;
          // swipe toward the start of the reading direction → next
          go((dx < 0 ? 1 : -1) * (rtl ? -1 : 1));
        }}
      >
        <button className="show-arrow prev" onClick={() => go(-1)} aria-label="previous">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={rtl ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"} />
          </svg>
        </button>
        <Link href={`/product/${p.slug}`} className="show-media" key={p.slug}>
          {off > 0 && <span className="sale-badge">{t("sale.off", { n: num(off, lang) })}</span>}
          <img src={p.image} alt={pf(p, "name", lang)} width="720" height="720" draggable="false" />
        </Link>
        <button className="show-arrow next" onClick={() => go(1)} aria-label="next">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={rtl ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
          </svg>
        </button>
      </div>
      <div className="show-info" key={"i" + p.slug}>
        <div className="show-brand">{p.brand}</div>
        <Link href={`/product/${p.slug}`} className="show-name">
          {pf(p, "name", lang)}
        </Link>
        <div className="show-price">
          {off > 0 && <s>{formatPrice(p.oldPrice, lang)}</s>}
          <b>{formatPrice(p.price, lang)}</b>
        </div>
        <div className="show-btn">
          <AddToCartButton slug={p.slug} />
        </div>
      </div>
      <div className="show-dots">
        {products.map((x, k) => (
          <button key={x.slug} className={k === i ? "on" : ""} onClick={() => go(k - i)} aria-label={x.brand} />
        ))}
      </div>
    </section>
  );
}
