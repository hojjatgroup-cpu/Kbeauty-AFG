"use client";

import { useEffect, useRef } from "react";

// Muted, looping background video for the home hero. Small file that starts loading immediately.
// Tells the loading screen when it can play, and retries play() on the first touch if the browser blocked it.
export default function HeroVideo({ onPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    const tryPlay = () => {
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    };
    const ready = () => {
      window.dispatchEvent(new Event("hero-video-ready"));
      tryPlay();
    };
    if (v.readyState >= 3) ready();
    v.addEventListener("canplay", ready);
    tryPlay();
    const onTouch = () => tryPlay();
    window.addEventListener("touchstart", onTouch, { once: true, passive: true });
    window.addEventListener("scroll", onTouch, { once: true, passive: true });
    return () => {
      v.removeEventListener("canplay", ready);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("scroll", onTouch);
    };
  }, []);

  return (
    <div className="hero-media" aria-hidden="true">
      <video
        ref={ref}
        className="hero-vid is-playing"
        src="/video/hero.mp4"
        poster="/video/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onPlaying={() => onPlaying && onPlaying()}
      />
      <span className="hero-veil" />
    </div>
  );
}
