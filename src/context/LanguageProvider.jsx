import { useEffect, useMemo, useState } from "react";
import { translations } from "../i18n/translations";
import { LanguageContext } from "./language-context.js";

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "en";
    return localStorage.getItem("gy-lang") === "mr" ? "mr" : "en";
  });

  useEffect(() => {
    localStorage.setItem("gy-lang", lang);
    document.documentElement.lang = lang === "mr" ? "mr" : "en";
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: translations[lang] || translations.en,
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
