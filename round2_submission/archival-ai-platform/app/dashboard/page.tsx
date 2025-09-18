"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Upload, Brain, Users, Eye, Clock, Search, ArrowLeft, Zap, Globe, BarChart3 } from "lucide-react"
import Link from "next/link"
// import { HeritageAnalyzer } from "@/components/heritage-analyzer"

interface AnnotationItem {
  id: string
  image: string
  title: string
  status: "processing" | "ai-complete" | "expert-review" | "completed"
  confidence: number
  aiAnnotation: string
  expertAnnotation?: string
  language: string
  collection: string
  uploadedAt: string
  processedAt?: string
}

const mockAnnotations: AnnotationItem[] = [
  {
    id: "ellenborough-market",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-09-19%20at%2012.15.40%E2%80%AFAM-VKlUfX5P63lgxtoVV6Y58iOtrfWX9X.png",
    title: "Ellenborough Market - Singapore River ca. 1970",
    status: "completed",
    confidence: 98,
    aiAnnotation:
      "This photograph captures the Singapore River at the Ellenborough Market district circa 1970, showing the juxtaposition between colonial-era shophouses and modern HDB housing. The image features traditional tongkangs and bumboats moored along the quay, Coleman Bridge in the foreground, and the triangular Ellenborough Buildings designed by J.T. Thomson in the mid-1840s.",
    expertAnnotation:
      "This historically significant photograph documents the Kampong Malacca/Ellenborough Market area just before the devastating fire of the 1970s. The triangular block of Ellenborough Buildings, constructed from the mid-1840s and designed by Government Surveyor J.T. Thomson, represents early colonial attempts to impose formal order on commercial architecture. The image captures the transition from a riverside mercantile economy to planned residential zoning, with traditional Teochew market culture giving way to post-independence urban renewal.",
    language: "English",
    collection: "Singapore Heritage",
    uploadedAt: "2024-01-16",
    processedAt: "2024-01-16",
  },
  {
    id: "1",
    image: "/colonial-architecture-raffles-hotel-singapore.jpg",
    title: "Colonial Architecture - Raffles Hotel",
    status: "completed",
    confidence: 95,
    aiAnnotation:
      "A grand colonial-style building with white facade and distinctive architecture, likely from the British colonial period in Singapore.",
    expertAnnotation:
      "The iconic Raffles Hotel, built in 1887, represents the pinnacle of colonial architecture in Singapore.",
    language: "English",
    collection: "Singapore Heritage",
    uploadedAt: "2024-01-15",
    processedAt: "2024-01-15",
  },
  {
    id: "2",
    image: "/traditional-street-market-1960s-singapore.jpg",
    title: "Traditional Street Market",
    status: "expert-review",
    confidence: 87,
    aiAnnotation:
      "A bustling street market scene with vendors selling various goods, appears to be from mid-20th century Singapore.",
    language: "English",
    collection: "Colonial Era",
    uploadedAt: "2024-01-14",
    processedAt: "2024-01-14",
  },
  {
    id: "3",
    image: "/singapore-independence-day-celebration-1965.jpg",
    title: "Independence Day Celebration",
    status: "ai-complete",
    confidence: 92,
    aiAnnotation:
      "A historic photograph showing crowds celebrating Singapore's independence, with flags and festive decorations visible.",
    language: "English",
    collection: "Independence Period",
    uploadedAt: "2024-01-13",
    processedAt: "2024-01-13",
  },
  {
    id: "4",
    image: "/traditional-chinese-new-year-festival-singapore.jpg",
    title: "Chinese New Year Festival",
    status: "processing",
    confidence: 0,
    aiAnnotation: "",
    language: "English",
    collection: "Cultural Festivals",
    uploadedAt: "2024-01-12",
  },
]

export default function DashboardPage() {
  const [annotations, setAnnotations] = useState<AnnotationItem[]>(mockAnnotations)
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCollection, setSelectedCollection] = useState<string>("all")
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    const fetchUploadedImages = async () => {
      try {
        const response = await fetch("/api/images")
        const data = await response.json()
        if (data.success) {
          // Combine mock data with uploaded images
          setAnnotations([...mockAnnotations, ...data.images])
        }
      } catch (error) {
        console.error("Failed to fetch uploaded images:", error)
      }
    }

    fetchUploadedImages()

    // Poll for updates every 5 seconds to show processing status changes
    const interval = setInterval(fetchUploadedImages, 5000)
    return () => clearInterval(interval)
  }, [])

  const filteredAnnotations = annotations.filter((item) => {
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus
    const matchesSearch =
      (item.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.aiAnnotation || "").toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCollection = selectedCollection === "all" || item.collection === selectedCollection

    return matchesStatus && matchesSearch && matchesCollection
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-yellow-500"
      case "ai-complete":
        return "bg-blue-500"
      case "expert-review":
        return "bg-orange-500"
      case "completed":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "processing":
        return "Processing"
      case "ai-complete":
        return "AI Complete"
      case "expert-review":
        return "Expert Review"
      case "completed":
        return "Completed"
      default:
        return "Unknown"
    }
  }

  const stats = {
    total: annotations.length,
    processing: annotations.filter((a) => a.status === "processing").length,
    aiComplete: annotations.filter((a) => a.status === "ai-complete").length,
    expertReview: annotations.filter((a) => a.status === "expert-review").length,
    completed: annotations.filter((a) => a.status === "completed").length,
    avgConfidence: Math.round(
      annotations.filter((a) => a.confidence > 0).reduce((acc, a) => acc + a.confidence, 0) /
        annotations.filter((a) => a.confidence > 0).length,
    ),
  }

  // const handleAnalysisResult = (analysis: string, imageId: string) => {
  //   setAnnotations((prev) =>
  //     prev.map((item) =>
  //       item.id === imageId
  //         ? { ...item, aiAnnotation: analysis, status: "ai-complete" as const, confidence: 90 }
  //         : item,
  //     ),
  //   )
  //   setShowAnalyzer(false)
  //   setSelectedImageForAnalysis(null)
  // }

  const handleRegenerateAnnotation = async (imageId: string, imageUrl: string) => {
    try {
      console.log("[v0] Regenerating annotation for:", imageId, imageUrl)

      setMessage(null)

      // Update status to processing
      setAnnotations((prev) =>
        prev.map((item) =>
          item.id === imageId ? { ...item, status: "processing" as const, confidence: 0, aiAnnotation: "" } : item,
        ),
      )

      const response = await fetch("/api/analyze-heritage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: imageUrl,
          context: "heritage analysis",
        }),
      })

      const data = await response.json()
      console.log("[v0] API response:", data)

      if (data.analysis) {
        setMessage({ type: "success", text: "AI annotation generated successfully!" })

        // Update with new AI annotation
        setAnnotations((prev) =>
          prev.map((item) =>
            item.id === imageId
              ? {
                  ...item,
                  aiAnnotation: data.analysis,
                  status: "ai-complete" as const,
                  confidence: 90,
                  processedAt: new Date().toISOString().split("T")[0],
                }
              : item,
          ),
        )

        setTimeout(() => setMessage(null), 5000)
      } else {
        setMessage({ type: "error", text: `Failed to generate annotation: ${data.error || "Unknown error"}` })

        // Revert status on error
        setAnnotations((prev) =>
          prev.map((item) => (item.id === imageId ? { ...item, status: "ai-complete" as const } : item)),
        )
        console.error("Failed to regenerate annotation:", data.error)
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error: Failed to connect to AI service" })

      console.error("Failed to regenerate annotation:", error)
      // Revert status on error
      setAnnotations((prev) =>
        prev.map((item) => (item.id === imageId ? { ...item, status: "ai-complete" as const } : item)),
      )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">AI Annotation Dashboard</h1>
                  <p className="text-sm text-muted-foreground">Monitor and manage AI-generated annotations</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAnalyzer(!showAnalyzer)}
                className={showAnalyzer ? "bg-blue-50 border-blue-200" : ""}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Heritage AI
              </Button> */}
              <Button variant="outline" size="sm" asChild>
                <Link href="/upload">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Images
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/review">
                  <Users className="w-4 h-4 mr-2" />
                  Expert Review
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {message && (
          <Card
            className={`mb-6 ${message.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
          >
            <CardContent className="p-4">
              <div className={`text-sm font-medium ${message.type === "success" ? "text-green-800" : "text-red-800"}`}>
                {message.text}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Images</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.processing}</div>
              <div className="text-sm text-muted-foreground">Processing</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.aiComplete}</div>
              <div className="text-sm text-muted-foreground">AI Complete</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.expertReview}</div>
              <div className="text-sm text-muted-foreground">Expert Review</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-secondary">{stats.avgConfidence}%</div>
              <div className="text-sm text-muted-foreground">Avg Confidence</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search annotations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="ai-complete">AI Complete</SelectItem>
                  <SelectItem value="expert-review">Expert Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedCollection} onValueChange={setSelectedCollection}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by collection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Collections</SelectItem>
                  <SelectItem value="Singapore Heritage">Singapore Heritage</SelectItem>
                  <SelectItem value="Colonial Era">Colonial Era</SelectItem>
                  <SelectItem value="Independence Period">Independence Period</SelectItem>
                  <SelectItem value="Cultural Festivals">Cultural Festivals</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Heritage Analyzer Section */}
        {/* {showAnalyzer && (
          <div className="mb-8">
            <HeritageAnalyzer
              imageUrl={selectedImageForAnalysis || undefined}
              onAnalysis={(analysis) => {
                if (selectedImageForAnalysis) {
                  handleAnalysisResult(analysis, selectedImageForAnalysis)
                }
              }}
            />
          </div>
        )} */}

        {/* Annotations List */}
        <div className="space-y-4">
          {filteredAnnotations.map((annotation) => (
            <Card key={annotation.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* Image */}
                  <div className="lg:w-80 flex-shrink-0">
                    <img
                      src={annotation.image || "/placeholder.svg"}
                      alt={annotation.title}
                      className="w-full h-48 lg:h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{annotation.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {annotation.uploadedAt}
                          </span>
                          <Badge variant="outline">{annotation.collection}</Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {annotation.language}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={`${getStatusColor(annotation.status)} text-white`}>
                          {getStatusText(annotation.status)}
                        </Badge>
                        {annotation.confidence > 0 && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <BarChart3 className="w-3 h-3" />
                            {annotation.confidence}%
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* AI Annotation */}
                    {annotation.aiAnnotation && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="w-4 h-4 text-secondary" />
                          <span className="text-sm font-medium">AI Annotation</span>
                          {annotation.confidence > 0 && <Progress value={annotation.confidence} className="w-20 h-2" />}
                        </div>
                        <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                          {annotation.aiAnnotation}
                        </p>
                      </div>
                    )}

                    {/* Expert Annotation */}
                    {annotation.expertAnnotation && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">Expert Enhancement</span>
                        </div>
                        <p className="text-sm text-foreground bg-primary/5 p-3 rounded-lg border border-primary/20">
                          {annotation.expertAnnotation}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-4 border-t border-border">
                      {annotation.status === "ai-complete" && (
                        <Button size="sm" asChild>
                          <Link href={`/review/${annotation.id}`}>
                            <Users className="w-4 h-4 mr-2" />
                            Review & Enhance
                          </Link>
                        </Button>
                      )}
                      {annotation.status === "expert-review" && (
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/review/${annotation.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            Continue Review
                          </Link>
                        </Button>
                      )}
                      {annotation.status === "completed" && (
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/gallery/${annotation.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Public
                          </Link>
                        </Button>
                      )}
                      {annotation.status === "processing" && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          AI Processing...
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAnnotations.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No annotations found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || selectedStatus !== "all" || selectedCollection !== "all"
                  ? "Try adjusting your filters or search query."
                  : "Upload some images to get started with AI annotation."}
              </p>
              <Button asChild>
                <Link href="/upload">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Images
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
