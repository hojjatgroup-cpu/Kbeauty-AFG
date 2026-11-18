"use client";

import { useLang } from "./LangProvider";

// Renders a content page from { fa: {...}, en: {...} } using the current language.
// Each language: { title, intro, sections: [{ h, p }] , box? }
export default function InfoPage({ content, children }) {
  const { lang } = useLang();
  const c = content[lang] || content.fa;
  return (
    <div className="container prose" style={{ maxWidth: 760 }}>
      <h1 className="page-title">{c.title}</h1>
      {c.intro && <p>{c.intro}</p>}
      {c.sections?.map((s) => (
        <div key={s.h}>
          <h2>{s.h}</h2>
          {Array.isArray(s.p) ? (
            <ul>
              {s.p.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          ) : (
            <p>{s.p}</p>
          )}
        </div>
      ))}
      {children}
    </div>
  );
}
