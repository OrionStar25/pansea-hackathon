"use client"

import { useState, useEffect } from "react"
import type { Language } from "@/lib/i18n"

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("en") // Default to "en" instead of null
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Load language from localStorage
    const savedLanguage = localStorage.getItem("archival-ai-language") as Language
    if (savedLanguage && ["en", "ms", "zh", "ta"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    } else {
      // Detect browser language
      const browserLang = navigator.language.toLowerCase()
      if (browserLang.startsWith("ms")) setLanguage("ms")
      else if (browserLang.startsWith("zh")) setLanguage("zh")
      else if (browserLang.startsWith("ta")) setLanguage("ta")
      else setLanguage("en")
    }
    setIsLoaded(true)
  }, [])

  const changeLanguage = (newLanguage: Language) => {
    console.log("[v0] Language changing to:", newLanguage)
    setLanguage(newLanguage)
    if (typeof window !== "undefined") {
      localStorage.setItem("archival-ai-language", newLanguage)
    }
    window.dispatchEvent(new CustomEvent("languageChanged", { detail: newLanguage }))
  }

  return {
    language, // Removed fallback since we now default to "en"
    changeLanguage,
    isLoaded,
  }
}
