"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import { useLang } from "./LangProvider";

export default function AddToCartButton({ slug }) {
  const { add } = useCart();
  const { t } = useLang();
  const [done, setDone] = useState(false);

  return (
    <button
      className="btn btn-ink btn-block"
      onClick={() => {
        add(slug);
        setDone(true);
        setTimeout(() => setDone(false), 1600);
      }}
    >
      {done ? t("p.added") : t("p.add")}
    </button>
  );
}
