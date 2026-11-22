"use client";

import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";

// 3 products per row that glide on their own, in the reading direction, and loop.
export default function BestSlider({ products, dir = "ltr", every = 3200 }) {
  const [i, setI] = useState(0);
  const [anim, setAnim] = useState(true);
  const paused = useRef(false);
  const touch = useRef(null);
  const N = products.length;
  const list = [...products, ...products.slice(0, 3)]; // copies for a seamless loop

  useEffect(() => {
    if (N <= 3) return;
    const id = setInterval(() => !paused.current && setI((x) => x + 1), every);
    return () => clearInterval(id);
  }, [N, every]);

  // after sliding onto the copies, jump back to the real first item without animation
  useEffect(() => {
    if (i < N) return;
    const id = setTimeout(() => {
      setAnim(false);
      setI(0);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
    }, 650);
    return () => clearTimeout(id);
  }, [i, N]);

  const move = (d) => setI((x) => (x + d < 0 ? N - 1 : x + d));
  const sign = dir === "rtl" ? 1 : -1;

  return (
    <div
      className="bslider"
      onTouchStart={(e) => {
        paused.current = true;
        touch.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - (touch.current ?? 0);
        if (Math.abs(dx) > 30) move((dx < 0 ? 1 : -1) * (dir === "rtl" ? -1 : 1));
        setTimeout(() => (paused.current = false), 4000);
      }}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div
        className="bslider-track"
        style={{
          transform: `translateX(${sign * i * (100 / 3)}%)`,
          transition: anim ? "transform .6s cubic-bezier(.4,0,.2,1)" : "none",
        }}
      >
        {list.map((p, k) => (
          <div className="bslider-cell" key={p.slug + k}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
