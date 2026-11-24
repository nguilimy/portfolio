import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations } from './translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-lang')
      if (saved && translations[saved]) return saved
      const navLang = navigator.language?.slice(0, 2)
      if (navLang === 'fr') return 'fr'
      if (navLang === 'ar') return 'ar'
    } catch {}
    return 'en'
  })

  const changeLang = (newLang) => {
    if (!translations[newLang]) return
    setLang(newLang)
    try {
      localStorage.setItem('portfolio-lang', newLang)
    } catch {}
    document.documentElement.lang = newLang
    document.documentElement.dir = translations[newLang].dir
  }

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = translations[lang].dir
  }, [lang])

  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, changeLang, t, translations }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    return { lang: 'en', changeLang: () => {}, t: translations.en, translations }
  }
  return ctx
}
