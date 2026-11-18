"use client";

import { useEffect, useRef, useState } from "react";

// Muted, looping, softly blurred background video for the home hero.
// Shows a still poster on slow connections, data-saver mode or reduced-motion.
export default function HeroVideo() {
  const ref = useRef(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const conn = navigator.connection || {};
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const slow = conn.saveData || /(^|-)2g$/.test(conn.effectiveType || "");
    if (!reduce && !slow) setPlay(true);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!play || !v) return;
    v.muted = true;
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  }, [play]);

  return (
    <div className="hero-media" aria-hidden="true">
      <img className="hero-poster" src="/video/hero-poster.jpg" alt="" />
      {play && (
        <video
          ref={ref}
          className="hero-vid"
          src="/video/hero.mp4"
          poster="/video/hero-poster.jpg"
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
