"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Auto-playing image slider with a soft cross-fade, dots and swipe.
export default function HeroSlider({ slides, interval = 4500 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const count = slides.length;

  useEffect(() => {
    if (paused || count < 2) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), interval);
    return () => clearTimeout(id);
  }, [index, paused, count, interval]);

  const go = (i) => setIndex(((i % count) + count) % count);

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

  if (!count) return null;

  return (
    <div
      className="slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="slider-frame">
        {slides.map((s, i) => {
          const img = (
            <img
              src={s.image}
              alt={s.alt || ""}
              loading={i === 0 ? "eager" : "lazy"}
              draggable="false"
            />
          );
          const cls = `slide ${i === index ? "is-active" : ""}`;
          return s.href ? (
            <Link key={s.image} href={s.href} className={cls} tabIndex={i === index ? 0 : -1}>
              {img}
            </Link>
          ) : (
            <div key={s.image} className={cls} aria-hidden={i !== index}>
              {img}
            </div>
          );
        })}
        <div className="slider-veil" aria-hidden="true" />
      </div>

      {count > 1 && (
        <div className="slider-dots">
          {slides.map((s, i) => (
            <button
              key={s.image}
              className={i === index ? "on" : ""}
              onClick={() => go(i)}
              aria-label={`${i + 1}`}
            >
              {i === index && !paused && <span style={{ animationDuration: `${interval}ms` }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
