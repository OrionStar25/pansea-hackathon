"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Upload, Users, Globe, BookOpen, Zap } from "lucide-react"
import Link from "next/link"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/hooks/use-language"
import { t } from "@/lib/i18n"
import { useState, useEffect } from "react"

export default function HomePage() {
  const { language, changeLanguage, isLoaded } = useLanguage()
  const [, forceUpdate] = useState({})

  useEffect(() => {
    const handleLanguageChange = () => {
      console.log("[v0] Language changed, forcing re-render")
      forceUpdate({})
    }

    window.addEventListener("languageChanged", handleLanguageChange)
    return () => window.removeEventListener("languageChanged", handleLanguageChange)
  }, [])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="text-lg font-semibold">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Archival AI</h1>
                <p className="text-sm text-muted-foreground">Heritage Annotation Platform</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
                {t("nav.dashboard", language)}
              </Link>
              <Link href="/gallery" className="text-foreground hover:text-primary transition-colors">
                {t("nav.gallery", language)}
              </Link>
              <LanguageSwitcher currentLanguage={language} onLanguageChange={changeLanguage} />
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                {t("nav.signIn", language)}
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            {t("home.hero.badge", language)}
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-balance mb-6">{t("home.hero.title", language)}</h2>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            {t("home.hero.subtitle", language)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/upload">
              <Button size="lg" className="text-lg px-8">
                <Upload className="w-5 h-5 mr-2" />
                {t("home.hero.uploadBtn", language)}
              </Button>
            </Link>
            <Link href="/gallery">
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Search className="w-5 h-5 mr-2" />
                {t("home.hero.exploreBtn", language)}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">{t("home.features.title", language)}</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("home.features.subtitle", language)}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t("home.features.ai.title", language)}</CardTitle>
                <CardDescription>{t("home.features.ai.desc", language)}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>{t("home.features.expert.title", language)}</CardTitle>
                <CardDescription>{t("home.features.expert.desc", language)}</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>{t("home.features.multilingual.title", language)}</CardTitle>
                <CardDescription>{t("home.features.multilingual.desc", language)}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">2,500+</div>
              <div className="text-muted-foreground">Images Annotated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">AI Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4</div>
              <div className="text-muted-foreground">Languages Supported</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Expert Contributors</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">{t("home.cta.title", language)}</h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">{t("home.cta.subtitle", language)}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/upload">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                {t("home.cta.startBtn", language)}
              </Button>
            </Link>
            <Link href="/gallery">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                {t("home.cta.learnBtn", language)}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold">Archival AI</span>
              </div>
              <p className="text-muted-foreground text-sm">{t("footer.about", language)}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("footer.platform.title", language)}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/dashboard" className="hover:text-foreground">
                    {t("nav.dashboard", language)}
                  </Link>
                </li>
                <li>
                  <Link href="/upload" className="hover:text-foreground">
                    {t("nav.upload", language)}
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="hover:text-foreground">
                    {t("nav.gallery", language)}
                  </Link>
                </li>
                <li>
                  <Link href="/analytics" className="hover:text-foreground">
                    {t("footer.platform.analytics", language)}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("footer.resources.title", language)}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/docs" className="hover:text-foreground">
                    {t("footer.resources.docs", language)}
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-foreground">
                    {t("footer.resources.api", language)}
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-foreground">
                    {t("footer.resources.support", language)}
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-foreground">
                    {t("footer.resources.community", language)}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("footer.legal.title", language)}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-foreground">
                    {t("footer.legal.privacy", language)}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground">
                    {t("footer.legal.terms", language)}
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-foreground">
                    {t("footer.legal.cookies", language)}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>{t("footer.copyright", language)}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
