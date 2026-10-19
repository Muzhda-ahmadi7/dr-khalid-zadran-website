import { createContext, useContext, useEffect, useState } from "react";
import en from "../locales/en";
import fa from "../locales/fa";
import ps from "../locales/ps";
const dict = { en, fa, ps },
  dir = { en: "ltr", fa: "rtl", ps: "rtl" };
const C = createContext(null);
const STORAGE_KEY = "neurosurgeon-language";
const isSupported = (code) => Boolean(dict[code]) || code === "en";
const readStored = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isSupported(stored) ? stored : "en";
  } catch {
    return "en";
  }
};

function applyDocumentLanguage(language) {
  document.documentElement.lang = language;
  document.documentElement.dir = dir[language];
}

applyDocumentLanguage(readStored());

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(readStored);
  const setLanguage = (code) =>
    setLanguageState(isSupported(code) ? code : "en");
  useEffect(() => {
    const current = isSupported(language) ? language : "en";
    applyDocumentLanguage(current);
    try {
      localStorage.setItem(STORAGE_KEY, current);
    } catch {}
  }, [language]);
  const t = (text) => {
    const value = dict[language]?.[text];
    if (
      value === undefined &&
      import.meta.env.DEV &&
      language !== "en" &&
      /[A-Za-z]{2,}/.test(String(text))
    )
      console.warn(`[i18n] missing ${language} translation:`, text);
    return value ?? text;
  };
  return (
    <C.Provider value={{ language, setLanguage, t, direction: dir[language] }}>
      {children}
    </C.Provider>
  );
}
export function useLanguage() {
  const c = useContext(C);
  if (!c) throw new Error("useLanguage must be used inside LanguageProvider");
  return c;
}
