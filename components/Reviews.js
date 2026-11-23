"use client";

import reviews from "@/data/reviews.json";
import { useLang } from "./LangProvider";

// Real customer messages (lightly tidied, meaning unchanged). Swipe sideways.
export default function Reviews() {
  const { t, lang } = useLang();
  return (
    <div className="rev-row">
      {reviews.map((r) => (
        <figure key={r.id} className="rev-card glass">
          {r.photo && <img src={r.photo} alt="" width="640" height="640" loading="lazy" />}
          <blockquote>{r[lang] || r.en}</blockquote>
          <figcaption>
            <span className="rev-dot" aria-hidden="true">“</span>
            {t(r.source === "whatsapp" ? "rev.whatsapp" : "rev.instagram")}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
