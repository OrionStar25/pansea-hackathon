"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  BookOpen,
  ArrowLeft,
  Brain,
  Users,
  Save,
  Check,
  X,
  Edit3,
  Globe,
  Calendar,
  MapPin,
  Tag,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

interface ReviewItem {
  id: string
  image: string
  title: string
  aiAnnotation: string
  confidence: number
  metadata: {
    date?: string
    location?: string
    collection: string
    tags: string[]
  }
  expertAnnotation?: string
  status: "pending" | "in-review" | "completed"
  reviewNotes?: string
  translations?: {
    [key: string]: string
  }
}

const mockReviewItems: ReviewItem[] = [
  {
    id: "1",
    image: "/singapore-street-market-1960s.jpg",
    title: "Traditional Street Market",
    aiAnnotation:
      "A bustling street market scene with vendors selling various goods, appears to be from mid-20th century Singapore. The image shows people in traditional clothing browsing stalls with fruits and vegetables.",
    confidence: 87,
    metadata: {
      date: "1960-05-15",
      location: "Chinatown, Singapore",
      collection: "Colonial Era",
      tags: ["market", "street", "vendors", "1960s"],
    },
    status: "pending",
  },
  {
    id: "2",
    image: "/singapore-cultural-festival.jpg",
    title: "Cultural Festival Celebration",
    aiAnnotation:
      "A cultural celebration with people in traditional dress, possibly a Chinese New Year or similar festival. There are decorations and what appears to be a ceremonial gathering.",
    confidence: 78,
    metadata: {
      date: "1955-02-12",
      location: "Singapore",
      collection: "Cultural Festivals",
      tags: ["festival", "celebration", "traditional", "chinese new year"],
    },
    status: "pending",
  },
]

export default function ReviewPage() {
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>(mockReviewItems)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [expertAnnotation, setExpertAnnotation] = useState("")
  const [reviewNotes, setReviewNotes] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [isEditing, setIsEditing] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const currentItem = reviewItems[currentIndex]

  const handleRegenerateAnnotation = async () => {
    try {
      console.log("[v0] Regenerating annotation for:", currentItem.id, currentItem.image)

      setMessage(null)
      setIsRegenerating(true)

      const response = await fetch("/api/analyze-heritage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: currentItem.image,
          context: "heritage analysis",
        }),
      })

      const data = await response.json()
      console.log("[v0] API response:", data)

      if (data.analysis) {
        setMessage({ type: "success", text: "AI annotation regenerated successfully!" })

        // Update with new AI annotation
        const updatedItems = [...reviewItems]
        updatedItems[currentIndex] = {
          ...currentItem,
          aiAnnotation: data.analysis,
          confidence: 90,
        }
        setReviewItems(updatedItems)

        setTimeout(() => setMessage(null), 5000)
      } else {
        setMessage({ type: "error", text: `Failed to regenerate annotation: ${data.error || "Unknown error"}` })
        console.error("Failed to regenerate annotation:", data.error)
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error: Failed to connect to AI service" })
      console.error("Failed to regenerate annotation:", error)
    } finally {
      setIsRegenerating(false)
    }
  }

  const handleSave = () => {
    const updatedItems = [...reviewItems]
    updatedItems[currentIndex] = {
      ...currentItem,
      expertAnnotation,
      reviewNotes,
      status: "in-review",
    }
    setReviewItems(updatedItems)
    setIsEditing(false)
  }

  const handleApprove = () => {
    const updatedItems = [...reviewItems]
    updatedItems[currentIndex] = {
      ...currentItem,
      expertAnnotation: expertAnnotation || currentItem.aiAnnotation,
      reviewNotes,
      status: "completed",
    }
    setReviewItems(updatedItems)

    // Move to next item
    if (currentIndex < reviewItems.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setExpertAnnotation("")
      setReviewNotes("")
      setIsEditing(false)
    }
  }

  const handleReject = () => {
    const updatedItems = [...reviewItems]
    updatedItems[currentIndex] = {
      ...currentItem,
      status: "pending",
      reviewNotes: reviewNotes || "Requires significant revision",
    }
    setReviewItems(updatedItems)
  }

  const startEditing = () => {
    setExpertAnnotation(currentItem.expertAnnotation || currentItem.aiAnnotation)
    setReviewNotes(currentItem.reviewNotes || "")
    setIsEditing(true)
  }

  if (!currentItem) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No items to review</h3>
            <p className="text-muted-foreground mb-4">All annotations have been reviewed.</p>
            <Button asChild>
              <Link href="/dashboard">Return to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Expert Review</h1>
                  <p className="text-sm text-muted-foreground">
                    Review and enhance AI annotations ({currentIndex + 1} of {reviewItems.length})
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {reviewItems.filter((item) => item.status === "completed").length} Completed
              </Badge>
              <Badge variant="outline">{reviewItems.filter((item) => item.status === "pending").length} Pending</Badge>
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image and Navigation */}
          <div className="space-y-6">
            {/* Image Display */}
            <Card>
              <CardContent className="p-0">
                <img
                  src={currentItem.image || "/placeholder.svg"}
                  alt={currentItem.title}
                  className="w-full h-96 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{currentItem.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {currentItem.metadata.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {currentItem.metadata.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="outline">{currentItem.metadata.collection}</Badge>
                    {currentItem.metadata.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                    disabled={currentIndex === 0}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {currentIndex + 1} of {reviewItems.length}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentIndex(Math.min(reviewItems.length - 1, currentIndex + 1))}
                    disabled={currentIndex === reviewItems.length - 1}
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Review Interface */}
          <div className="space-y-6">
            <Tabs defaultValue="review" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="review">Review</TabsTrigger>
                <TabsTrigger value="translate">Translate</TabsTrigger>
                <TabsTrigger value="metadata">Metadata</TabsTrigger>
              </TabsList>

              <TabsContent value="review" className="space-y-4">
                {/* AI Annotation */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-secondary" />
                      AI Annotation
                      <Badge variant="outline" className="ml-auto">
                        {currentItem.confidence}% confidence
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Review the AI-generated description and enhance with expert knowledge
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 p-4 rounded-lg mb-4">
                      <p className="text-sm">{currentItem.aiAnnotation}</p>
                    </div>
                    {currentItem.confidence < 80 && (
                      <div className="flex items-center gap-2 text-amber-600 text-sm mb-4">
                        <AlertCircle className="w-4 h-4" />
                        Low confidence - requires expert review
                      </div>
                    )}
                    <Button
                      variant="outline"
                      onClick={handleRegenerateAnnotation}
                      disabled={isRegenerating}
                      className="w-full bg-transparent"
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      {isRegenerating ? "Regenerating..." : "Regenerate AI Annotation"}
                    </Button>
                  </CardContent>
                </Card>

                {/* Expert Enhancement */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Expert Enhancement
                    </CardTitle>
                    <CardDescription>Correct, enhance, and add cultural context to the annotation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!isEditing ? (
                      <div>
                        {currentItem.expertAnnotation ? (
                          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 mb-4">
                            <p className="text-sm">{currentItem.expertAnnotation}</p>
                          </div>
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <Edit3 className="w-8 h-8 mx-auto mb-2" />
                            <p>No expert annotation yet</p>
                          </div>
                        )}
                        <Button onClick={startEditing} className="w-full">
                          <Edit3 className="w-4 h-4 mr-2" />
                          {currentItem.expertAnnotation ? "Edit Annotation" : "Add Expert Annotation"}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="expert-annotation">Enhanced Annotation</Label>
                          <Textarea
                            id="expert-annotation"
                            placeholder="Enhance the AI annotation with expert knowledge, cultural context, and corrections..."
                            value={expertAnnotation}
                            onChange={(e) => setExpertAnnotation(e.target.value)}
                            className="min-h-32"
                          />
                        </div>
                        <div>
                          <Label htmlFor="review-notes">Review Notes (Internal)</Label>
                          <Textarea
                            id="review-notes"
                            placeholder="Add internal notes about changes made, sources consulted, etc..."
                            value={reviewNotes}
                            onChange={(e) => setReviewNotes(e.target.value)}
                            className="min-h-20"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleSave} className="flex-1">
                            <Save className="w-4 h-4 mr-2" />
                            Save Draft
                          </Button>
                          <Button variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Actions */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex gap-2">
                      <Button
                        onClick={handleApprove}
                        className="flex-1"
                        disabled={!expertAnnotation && !currentItem.expertAnnotation}
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Approve & Continue
                      </Button>
                      <Button variant="destructive" onClick={handleReject}>
                        <X className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="translate" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-accent" />
                      Multilingual Translation
                    </CardTitle>
                    <CardDescription>Provide translations for broader accessibility</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="language-select">Target Language</Label>
                      <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="ms">Malay</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                          <SelectItem value="ta">Tamil</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="translation">Translation</Label>
                      <Textarea
                        id="translation"
                        placeholder={`Enter ${selectedLanguage === "ms" ? "Malay" : selectedLanguage === "zh" ? "Chinese" : selectedLanguage === "ta" ? "Tamil" : "English"} translation...`}
                        className="min-h-32"
                      />
                    </div>
                    <Button className="w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Save Translation
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="metadata" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Metadata</CardTitle>
                    <CardDescription>Update or add additional contextual information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" defaultValue={currentItem.metadata.date} />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="Specific location or address"
                        defaultValue={currentItem.metadata.location}
                      />
                    </div>
                    <div>
                      <Label htmlFor="collection">Collection</Label>
                      <Select defaultValue={currentItem.metadata.collection}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Singapore Heritage">Singapore Heritage</SelectItem>
                          <SelectItem value="Colonial Era">Colonial Era</SelectItem>
                          <SelectItem value="Independence Period">Independence Period</SelectItem>
                          <SelectItem value="Cultural Festivals">Cultural Festivals</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        placeholder="Comma-separated tags"
                        defaultValue={currentItem.metadata.tags.join(", ")}
                      />
                    </div>
                    <Button className="w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Update Metadata
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
