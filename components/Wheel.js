"use client";

import Link from "next/link";
import { useRef, useState } from "react";

// Circles in one straight row: the centre one big and sharp, the others smaller and blurred.
// Swipe left/right or tap a side circle to bring it to the centre. Loops forever.
// items: [{ key, href, label, node }]
export default function Wheel({ items, start = 0, dir = "ltr" }) {
  const N = items.length;
  const wrap = (i) => ((i % N) + N) % N;
  const [active, setActive] = useState(wrap(start));
  const touch = useRef(null);
  const step = (d) => setActive((a) => wrap(a + d));
  const sideSign = dir === "rtl" ? -1 : 1; // next item sits on the reading side

  return (
    <div
      className="arc"
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current == null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        touch.current = null;
        if (Math.abs(dx) < 30) return;
        step((dx < 0 ? 1 : -1) * sideSign);
      }}
    >
      <div className="arc-stage">
        {items.map((it, i) => {
          let off = wrap(i - active);
          if (off > N / 2) off -= N;
          const a = Math.min(Math.abs(off), 3);
          const far = a > 2;
          const sign = Math.sign(off) * sideSign;
          const pos = {
            "--x": `${sign * [0, 92, 160, 205][a]}px`,
            "--y": "0px",
            "--s": [1, 0.66, 0.5, 0.4][a],
            "--b": `${[0, 1.4, 3, 4][a]}px`,
            "--op": [1, 0.85, 0.55, 0][a],
            zIndex: 10 - a,
          };
          return (
            <Link
              key={it.key}
              href={it.href}
              className={`arc-item ${off === 0 ? "on" : ""}`}
              style={pos}
              aria-label={it.label}
              aria-hidden={far}
              tabIndex={far ? -1 : 0}
              onClick={(e) => {
                if (off !== 0) {
                  e.preventDefault();
                  step(off);
                }
              }}
            >
              {it.node}
            </Link>
          );
        })}
      </div>
      <p className="arc-name">{items[active].label}</p>
    </div>
  );
}
