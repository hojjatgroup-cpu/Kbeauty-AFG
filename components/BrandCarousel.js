"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import brands from "@/data/brands.json";

// Brand logos in circles on a gentle arc: the centre one is big and sharp,
// the 1st ring beside it smaller and a little blurred, the 2nd ring smaller and more blurred.
// Swipe left/right (or tap a side logo) to turn the wheel. It loops forever.
const N = brands.length;
const wrap = (i) => ((i % N) + N) % N;

export default function BrandCarousel() {
  const [active, setActive] = useState(0); // brands.json starts with Anua
  const start = useRef(null);

  const step = (d) => setActive((a) => wrap(a + d));

  const onTouchStart = (e) => {
    start.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (start.current == null) return;
    const dx = e.changedTouches[0].clientX - start.current;
    start.current = null;
    if (Math.abs(dx) < 30) return;
    // swipe left → next brand comes from the right
    step(dx < 0 ? 1 : -1);
  };

  return (
    <div className="arc" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="arc-stage">
        {brands.map((b, i) => {
          // shortest signed distance from the centre, so the wheel loops
          let off = wrap(i - active);
          if (off > N / 2) off -= N;
          const a = Math.min(Math.abs(off), 3);
          const far = a > 2;
          const sign = Math.sign(off);
          const pos = {
            "--x": `${sign * [0, 86, 150, 190][a]}px`,
            "--y": `${[0, -24, -56, -70][a]}px`,
            "--s": [1, 0.66, 0.5, 0.4][a],
            "--b": `${[0, 1.4, 3, 4][a]}px`,
            "--op": [1, 0.85, 0.55, 0][a],
            zIndex: 10 - a,
          };
          return (
            <Link
              key={b.slug}
              href={`/shop?brand=${b.slug}`}
              className={`arc-item ${off === 0 ? "on" : ""}`}
              style={pos}
              aria-label={b.name}
              aria-hidden={far}
              tabIndex={far ? -1 : 0}
              onClick={(e) => {
                if (off !== 0) {
                  e.preventDefault();
                  step(off);
                }
              }}
            >
              <img src={b.logo} alt={b.name} width="480" height="240" loading="lazy" draggable="false" />
            </Link>
          );
        })}
      </div>
      <p className="arc-name">{brands[active].name}</p>
    </div>
  );
}
