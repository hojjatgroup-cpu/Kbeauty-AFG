"use client";

import { useEffect, useRef, useState } from "react";
import reviews from "@/data/reviews.json";
import { useLang } from "./LangProvider";

// Soft white sparkles drifting down, drawn on a canvas (very light, no video file)
function Sparkles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let w, h, raf;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const P = Array.from({ length: 70 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.4,
      s: Math.random() * 0.35 + 0.12,
      d: Math.random() * 0.6 - 0.3,
      t: Math.random() * 6.28,
    }));
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of P) {
        if (!still) {
          p.y += p.s;
          p.x += p.d * 0.3 + Math.sin(p.t) * 0.15;
          p.t += 0.02;
          if (p.y > h + 4) {
            p.y = -4;
            p.x = Math.random() * w;
          }
        }
        const a = 0.45 + Math.sin(p.t * 2) * 0.35;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.shadowColor = "rgba(255,255,255,.9)";
        ctx.shadowBlur = p.r * 4;
        ctx.arc(p.x, p.y, p.r, 0, 6.283);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className="revv-snow" />;
}

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
      <div className="revv-bg" aria-hidden="true">
        <span className="revv-ray" />
        <Sparkles />
      </div>
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
