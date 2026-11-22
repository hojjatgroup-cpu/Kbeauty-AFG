"use client";

import { useEffect, useRef, useState } from "react";

// A different video on each visit (never the same one twice in a row)
const VIDEOS = ["hero", "hero2", "hero3", "hero4"];
function pickVideo() {
  // play the videos in turn: 1 → 2 → 3 → 4 → 1 …
  let i;
  try {
    const last = localStorage.getItem("kbeauty-hero");
    i = last == null ? Math.floor(Math.random() * VIDEOS.length) : (Number(last) + 1) % VIDEOS.length;
    localStorage.setItem("kbeauty-hero", String(i));
  } catch {
    i = Math.floor(Date.now() / 1000) % VIDEOS.length;
  }
  return VIDEOS[i] || VIDEOS[0];
}

// Muted, looping background video for the home hero. Small file that starts loading immediately.
// Tells the loading screen when it can play, and retries play() on the first touch if the browser blocked it.
export default function HeroVideo({ onPlaying }) {
  const ref = useRef(null);
  const [name, setName] = useState(null);

  useEffect(() => setName(pickVideo()), []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !name) return;
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
  }, [name]);

  return (
    <div className="hero-media" aria-hidden="true">
      {name && (
      <video
        key={name}
        ref={ref}
        className="hero-vid is-playing"
        src={`/video/${name}.mp4`}
        poster={`/video/${name}-poster.jpg`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onPlaying={() => onPlaying && onPlaying()}
      />
      )}
      <span className="hero-veil" />
    </div>
  );
}
