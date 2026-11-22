"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "./LangProvider";
import { PROMO, promoActive, saveCoupon } from "@/lib/promo";

// Slim animated strip above the header: first-order discount, scrolling endlessly.
export default function PromoBar() {
  const { t } = useLang();
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => setShow(!!PROMO && promoActive()), []);
  if (!show) return null;

  const go = () => {
    saveCoupon(PROMO.code);
    router.push("/shop");
  };

  const item = (k) => (
    <span className="pbar-item" key={k}>
      <span className="pbar-spark" aria-hidden="true">✦</span>
      {t("bar.text")}
      <b dir="ltr">{PROMO.code}</b>
    </span>
  );

  return (
    <button className="pbar" onClick={go} aria-label={t("bar.text") + " " + PROMO.code}>
      <span className="pbar-track" aria-hidden="true">
        <span className="pbar-group">{[0, 1, 2, 3].map(item)}</span>
        <span className="pbar-group">{[4, 5, 6, 7].map(item)}</span>
      </span>
    </button>
  );
}
