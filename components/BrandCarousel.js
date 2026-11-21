"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import brands from "@/data/brands.json";

// Swipeable brand logos: the centre one is sharp, the ones beside it are blurred
export default function BrandCarousel() {
  const track = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mid = el.getBoundingClientRect().left + el.clientWidth / 2;
        let best = 0;
        let dist = Infinity;
        [...el.children].forEach((c, i) => {
          const r = c.getBoundingClientRect();
          const d = Math.abs(r.left + r.width / 2 - mid);
          if (d < dist) {
            dist = d;
            best = i;
          }
        });
        setActive(best);
      });
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const go = (i) => {
    const el = track.current;
    const c = el && el.children[i];
    if (c) c.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <div className="bcar">
      <div className="bcar-track" ref={track}>
        {brands.map((b, i) => (
          <Link
            key={b.slug}
            href={`/shop?brand=${b.slug}`}
            className={`bcar-item ${i === active ? "on" : ""}`}
            aria-label={b.name}
            onClick={(e) => {
              if (i !== active) {
                e.preventDefault();
                go(i);
              }
            }}
          >
            <img src={b.logo} alt={b.name} width="480" height="240" loading="lazy" draggable="false" />
          </Link>
        ))}
      </div>
      <div className="bcar-dots">
        {brands.map((b, i) => (
          <button key={b.slug} className={i === active ? "on" : ""} onClick={() => go(i)} aria-label={b.name} />
        ))}
      </div>
    </div>
  );
}
