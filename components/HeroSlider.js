"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Auto-playing banner slider with a soft frosted look.
// Each slide: blurred copy of the image fills the frame, the image itself sits on top.
export default function HeroSlider({ banners = [], seconds = 4.5 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const count = banners.length;

  useEffect(() => {
    if (count < 2 || paused) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), seconds * 1000);
    return () => clearTimeout(id);
  }, [index, paused, count, seconds]);

  if (!count) return null;

  const go = (i) => setIndex((i + count) % count);
  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e) => {
    const start = touchX.current;
    touchX.current = null;
    setPaused(false);
    if (start == null) return;
    const dx = e.changedTouches[0].clientX - start;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
  };

  return (
    <div
      className="slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {banners.map((b, i) => {
        const active = i === index;
        const inner = (
          <>
            <img className="slide-bg" src={b.image} alt="" aria-hidden="true" loading={i === 0 ? "eager" : "lazy"} />
            <img className="slide-img" src={b.image} alt={b.alt || ""} loading={i === 0 ? "eager" : "lazy"} />
            <span className="slide-veil" aria-hidden="true" />
          </>
        );
        const cls = `slide ${active ? "slide-active" : ""}`;
        return b.href ? (
          <Link key={b.image} href={b.href} className={cls} aria-hidden={!active} tabIndex={active ? 0 : -1}>
            {inner}
          </Link>
        ) : (
          <div key={b.image} className={cls} aria-hidden={!active}>
            {inner}
          </div>
        );
      })}

      {count > 1 && (
        <div className="slider-dots">
          {banners.map((b, i) => (
            <button
              key={b.image}
              className={i === index ? "on" : ""}
              aria-label={`${i + 1}`}
              onClick={() => go(i)}
            >
              {i === index && !paused && (
                <span className="dot-fill" style={{ animationDuration: `${seconds}s` }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
