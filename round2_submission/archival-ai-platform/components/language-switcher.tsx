"use client"
import { Button } from "@/components/ui/button"
import { Globe, ChevronDown } from "lucide-react"
import { languages, type Language } from "@/lib/i18n"
import { useState, useRef, useEffect } from "react"

interface LanguageSwitcherProps {
  currentLanguage: Language
  onLanguageChange: (language: Language) => void
}

export function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleLanguageChange = (newLanguage: Language) => {
    console.log("[v0] Language changing to:", newLanguage)
    onLanguageChange(newLanguage)
    setIsOpen(false)
  }

  const toggleDropdown = () => {
    console.log("[v0] Dropdown toggle clicked, current state:", isOpen)
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent" onClick={toggleDropdown}>
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{languages[currentLanguage].name}</span>
        <span className="sm:hidden">{languages[currentLanguage].flag}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
          {Object.entries(languages).map(([code, { name, flag }]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code as Language)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-md last:rounded-b-md ${
                currentLanguage === code ? "bg-gray-100 dark:bg-gray-700" : ""
              }`}
            >
              <span>{flag}</span>
              <span>{name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
