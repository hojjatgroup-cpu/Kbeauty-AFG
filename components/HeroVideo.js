"use client";

import { useEffect, useRef } from "react";

// Muted, looping background video for the home hero. Starts loading right away (small file).
// Calls onPlaying once the video is actually playing.
export default function HeroVideo({ onPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
    if (!v.paused && v.readyState > 2) onPlaying && onPlaying();
  }, [onPlaying]);

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
