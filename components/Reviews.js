"use client";

import { useEffect, useRef, useState } from "react";
import reviews from "@/data/reviews.json";
import { useLang } from "./LangProvider";

// Real customer messages (original screenshots) over a soft background video.
// One at a time, ~4s each, then the next; loops forever. Swipe also works.
export default function Reviews({ title, kicker, every = 4000 }) {
  const { t, lang } = useLang();
  const N = reviews.length;
  const [i, setI] = useState(0);
  const last = useRef(Date.now());
  const touch = useRef(null);
  const rtl = lang === "fa";

  const go = (d) => {
    last.current = Date.now();
    setI((x) => (x + d + N) % N);
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() - last.current >= every - 50) {
        last.current = Date.now();
        setI((x) => (x + 1) % N);
      }
    }, 500);
    return () => clearInterval(id);
  }, [N, every]);

  return (
    <section
      className="revv"
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current == null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        touch.current = null;
        if (Math.abs(dx) > 35) go((dx < 0 ? 1 : -1) * (rtl ? -1 : 1));
      }}
    >
      <div className="revv-inner">
        <span className="kicker">{kicker}</span>
        <h2 className="revv-title">{title}</h2>
        <div className="revv-stage">
          {reviews.map((r, k) => (
            <figure key={r.id} className={`revv-card glass ${k === i ? "on" : ""}`} aria-hidden={k !== i}>
              <img src={r.photo} alt={r[lang] || r.en} loading="lazy" />
              <figcaption>
                <span className="rev-dot" aria-hidden="true">“</span>
                {t(r.source === "whatsapp" ? "rev.whatsapp" : "rev.instagram")}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="show-dots">
          {reviews.map((r, k) => (
            <button key={r.id} className={k === i ? "on" : ""} onClick={() => go(k - i)} aria-label={String(k + 1)} />
          ))}
        </div>
      </div>
    </section>
  );
}
