"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

export default function AddToCartButton({ slug, small = false }) {
  const { add } = useCart();
  const [done, setDone] = useState(false);

  return (
    <button
      className={`btn btn-primary ${small ? "btn-sm" : "btn-block"}`}
      onClick={() => {
        add(slug);
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
    >
      {done ? "✓ اضافه شد" : "افزودن به سبد"}
    </button>
  );
}
