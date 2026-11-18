"use client";

import { useEffect, useRef, useState } from "react";

// Muted, looping background video for the home hero.
// The still poster shows right away; the small video file starts loading only after
// the rest of the page has loaded, so it never slows the page down.
export default function HeroVideo() {
  const ref = useRef(null);
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const conn = navigator.connection || {};
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const slow = conn.saveData || /(^|-)2g$/.test(conn.effectiveType || "");
    if (reduce || slow) return;
    let timer;
    const start = () => {
      timer = setTimeout(() => setSrc("/video/hero.mp4"), 300);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", start);
    };
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!src || !v) return;
    v.muted = true;
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  }, [src]);

  return (
    <div className="hero-media" aria-hidden="true">
      <img className="hero-poster" src="/video/hero-poster.jpg" alt="" fetchPriority="high" />
      {src && (
        <video
          ref={ref}
          className="hero-vid"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={(e) => e.currentTarget.classList.add("is-playing")}
        />
      )}
      <span className="hero-veil" />
    </div>
  );
}
