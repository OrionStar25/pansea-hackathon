"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Sparkles, ImageIcon } from "lucide-react"

interface HeritageAnalyzerProps {
  imageUrl?: string
  onAnalysis?: (analysis: string) => void
}

export function HeritageAnalyzer({ imageUrl, onAnalysis }: HeritageAnalyzerProps) {
  const [prompt, setPrompt] = useState("")
  const [analysis, setAnalysis] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeHeritage = async () => {
    if (!prompt && !imageUrl) return

    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/analyze-heritage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
          prompt: imageUrl
            ? `Analyze this heritage image for cultural and historical significance: ${prompt || "Provide detailed analysis"}`
            : prompt,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze heritage content")
      }

      const result = await response.json()
      setAnalysis(result.analysis)
      onAnalysis?.(result.analysis)
    } catch (error) {
      console.error("[v0] Analysis error:", error)
      setAnalysis("Sorry, I could not analyze this heritage content. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-600" />
          Heritage AI Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {imageUrl && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ImageIcon className="h-4 w-4" />
            Analyzing image: {imageUrl.split("/").pop()}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="prompt" className="text-sm font-medium">
            {imageUrl ? "Additional context or specific questions:" : "Enter your heritage-related question:"}
          </label>
          <Textarea
            id="prompt"
            placeholder={
              imageUrl
                ? "Ask about cultural significance, historical context, architectural style, etc."
                : "Ask about Singapore heritage, cultural practices, historical events, etc."
            }
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
          />
        </div>

        <Button onClick={analyzeHeritage} disabled={isAnalyzing || (!prompt && !imageUrl)} className="w-full">
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Analyze Heritage Content
            </>
          )}
        </Button>

        {analysis && (
          <div className="space-y-2">
            <label className="text-sm font-medium">AI Analysis:</label>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{analysis}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
