"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { translate, SKIN_LABELS, TYPE_LABELS } from "@/lib/i18n";

const LangContext = createContext(null);
const KEY = "kbeauty-lang";

export function LangProvider({ children }) {
  const [lang, setLangState] = useState("fa");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "en" || saved === "fa") setLangState(saved);
    } catch (e) {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch (e) {}
  }, []);

  const t = useCallback((key, vars) => translate(lang, key, vars), [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t, skins: SKIN_LABELS[lang], types: TYPE_LABELS[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

// For use inside server components: <T k="nav.home" />
export function T({ k, vars }) {
  const { t } = useLang();
  return <>{t(k, vars)}</>;
}
