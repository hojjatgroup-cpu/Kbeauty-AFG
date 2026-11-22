"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "./LangProvider";
import { PROMO, promoActive, firstOrderDone, popupSeen, markPopupSeen, saveCoupon } from "@/lib/promo";
import { num } from "@/lib/products";

export default function PromoPopup() {
  const { t, lang } = useLang();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!PROMO || !promoActive() || popupSeen() || firstOrderDone()) return;
    // let the splash + hero texts appear first
    const id = setTimeout(() => setOpen(true), 20000);
    return () => clearTimeout(id);
  }, []);

  if (!open) return null;

  const close = () => {
    markPopupSeen();
    setOpen(false);
  };
  const apply = () => {
    saveCoupon(PROMO.code);
    close();
    router.push("/shop");
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROMO.code);
    } catch {}
    saveCoupon(PROMO.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const until = new Date(`${PROMO.until}T12:00:00`).toLocaleDateString({ fa: "fa-AF", en: "en-GB", ko: "ko-KR" }[lang], {
    day: "numeric",
    month: "long",
  });

  return (
    <div className="promo-back" onClick={close} role="dialog" aria-modal="true" aria-labelledby="promo-title">
      <div className="promo-card" onClick={(e) => e.stopPropagation()}>
        <button className="promo-x" onClick={close} aria-label={t("promo.later")}>
          ×
        </button>
        <span className="promo-glow" aria-hidden="true" />
        <span className="kicker">{t("promo.kicker")}</span>
        <div className="promo-big">
          <span>{num(PROMO.percent, lang)}</span>
          <small>{lang === "fa" ? "٪" : "%"}</small>
        </div>
        <h2 id="promo-title">{t("promo.title")}</h2>
        <p className="promo-sub">{t("promo.sub", { date: until })}</p>
        <button className="promo-code" onClick={copy} dir="ltr">
          <span>{PROMO.code}</span>
          <em>{copied ? t("promo.copied") : t("promo.copy")}</em>
        </button>
        <button className="btn btn-ink btn-block" onClick={apply}>
          {t("promo.cta")}
        </button>
        <button className="promo-later" onClick={close}>
          {t("promo.later")}
        </button>
        <p className="promo-note">{t("promo.note")}</p>
      </div>
    </div>
  );
}
