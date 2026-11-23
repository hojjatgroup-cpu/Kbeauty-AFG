"use client";

import reviews from "@/data/reviews.json";
import { useLang } from "./LangProvider";

// Real customer messages, shown as the original screenshots. Swipe sideways.
export default function Reviews() {
  const { t, lang } = useLang();
  return (
    <div className="rev-row">
      {reviews.map((r) => (
        <figure key={r.id} className="rev-card glass">
          <img src={r.photo} alt={r[lang] || r.en} loading="lazy" />
          <figcaption>
            <span className="rev-dot" aria-hidden="true">“</span>
            {t(r.source === "whatsapp" ? "rev.whatsapp" : "rev.instagram")}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
