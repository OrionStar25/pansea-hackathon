"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Upload, X, FileImage, Calendar, MapPin, Tag, BookOpen, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useDropzone } from "react-dropzone"
import { useRouter } from "next/navigation"

interface UploadedFile {
  file: File
  preview: string
  id: string
  metadata?: {
    title?: string
    description?: string
    date?: string
    location?: string
    collection?: string
    tags?: string[]
  }
}

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [uploadComplete, setUploadComplete] = useState(false)
  const router = useRouter()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9),
      metadata: {},
    }))
    setUploadedFiles((prev) => [...prev, ...newFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".bmp", ".tiff"],
    },
    multiple: true,
  })

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => {
      const file = prev.find((f) => f.id === id)
      if (file) {
        URL.revokeObjectURL(file.preview)
      }
      return prev.filter((f) => f.id !== id)
    })
  }

  const updateFileMetadata = (id: string, metadata: Partial<UploadedFile["metadata"]>) => {
    setUploadedFiles((prev) =>
      prev.map((file) => (file.id === id ? { ...file, metadata: { ...file.metadata, ...metadata } } : file)),
    )
  }

  const handleUpload = async () => {
    if (uploadedFiles.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)
    setUploadComplete(false)

    try {
      const formData = new FormData()

      uploadedFiles.forEach((uploadedFile) => {
        formData.append("files", uploadedFile.file)
      })

      const metadataMap: Record<string, any> = {}
      uploadedFiles.forEach((uploadedFile) => {
        metadataMap[uploadedFile.file.name] = uploadedFile.metadata
      })
      formData.append("metadata", JSON.stringify(metadataMap))

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 15
        })
      }, 300)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      const result = await response.json()

      if (result.success) {
        setUploadComplete(true)

        setTimeout(() => {
          setUploadedFiles([])
          setSelectedFile(null)
          setIsUploading(false)
          setUploadProgress(0)
          setUploadComplete(false)

          router.push("/dashboard")
        }, 2000)
      } else {
        throw new Error(result.message || "Upload failed")
      }
    } catch (error) {
      setIsUploading(false)
      setUploadProgress(0)
      alert("Upload failed. Please try again.")
    }
  }

  const selectedFileData = uploadedFiles.find((f) => f.id === selectedFile)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
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
                <h1 className="text-xl font-bold text-foreground">Upload Images</h1>
                <p className="text-sm text-muted-foreground">Add heritage images for AI annotation</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Drag & Drop Zone */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Heritage Images</CardTitle>
                <CardDescription>
                  Drag and drop images or click to browse. Supported formats: JPEG, PNG, GIF, BMP, TIFF
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  {isDragActive ? (
                    <p className="text-primary font-medium">Drop the images here...</p>
                  ) : (
                    <div>
                      <p className="text-foreground font-medium mb-2">Drag & drop images here, or click to select</p>
                      <p className="text-muted-foreground text-sm">Maximum file size: 10MB per image</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Uploaded Files Grid */}
            {uploadedFiles.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Uploaded Images ({uploadedFiles.length})</CardTitle>
                  <CardDescription>Click on an image to add metadata before processing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {uploadedFiles.map((file) => (
                      <div
                        key={file.id}
                        className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedFile === file.id ? "border-primary" : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedFile(file.id)}
                      >
                        <img
                          src={file.preview || "/placeholder.svg"}
                          alt={file.file.name}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeFile(file.id)
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2">
                          <p className="text-xs truncate">{file.file.name}</p>
                          {file.metadata?.title && (
                            <Badge variant="secondary" className="mt-1 text-xs">
                              Metadata Added
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Upload Progress */}
            {isUploading && (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        {uploadComplete ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            Upload completed! Redirecting to dashboard...
                          </div>
                        ) : (
                          "Uploading and processing images..."
                        )}
                      </span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            {uploadedFiles.length > 0 && (
              <div className="flex gap-4">
                <Button onClick={handleUpload} disabled={isUploading} className="flex-1">
                  <Upload className="w-4 h-4 mr-2" />
                  {isUploading ? "Processing..." : `Process ${uploadedFiles.length} Images`}
                </Button>
                <Button variant="outline" onClick={() => setUploadedFiles([])} disabled={isUploading}>
                  Clear All
                </Button>
              </div>
            )}
          </div>

          {/* Metadata Panel */}
          <div className="space-y-6">
            {selectedFileData ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileImage className="w-5 h-5" />
                    Image Metadata
                  </CardTitle>
                  <CardDescription>Add contextual information to improve AI annotation accuracy</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <img
                      src={selectedFileData.preview || "/placeholder.svg"}
                      alt={selectedFileData.file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter image title"
                        value={selectedFileData.metadata?.title || ""}
                        onChange={(e) => updateFileMetadata(selectedFileData.id, { title: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe what you see in the image"
                        value={selectedFileData.metadata?.description || ""}
                        onChange={(e) => updateFileMetadata(selectedFileData.id, { description: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="date">Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="date"
                          type="date"
                          className="pl-10"
                          value={selectedFileData.metadata?.date || ""}
                          onChange={(e) => updateFileMetadata(selectedFileData.id, { date: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          placeholder="e.g., Singapore, Chinatown"
                          className="pl-10"
                          value={selectedFileData.metadata?.location || ""}
                          onChange={(e) => updateFileMetadata(selectedFileData.id, { location: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="collection">Collection</Label>
                      <Select
                        value={selectedFileData.metadata?.collection || ""}
                        onValueChange={(value) => updateFileMetadata(selectedFileData.id, { collection: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select collection" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="singapore-heritage">Singapore Heritage</SelectItem>
                          <SelectItem value="colonial-era">Colonial Era</SelectItem>
                          <SelectItem value="independence">Independence Period</SelectItem>
                          <SelectItem value="modern-singapore">Modern Singapore</SelectItem>
                          <SelectItem value="cultural-festivals">Cultural Festivals</SelectItem>
                          <SelectItem value="architecture">Architecture</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="tags"
                          placeholder="e.g., building, people, festival (comma-separated)"
                          className="pl-10"
                          onChange={(e) => {
                            const tags = e.target.value
                              .split(",")
                              .map((tag) => tag.trim())
                              .filter(Boolean)
                            updateFileMetadata(selectedFileData.id, { tags })
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center">
                  <FileImage className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Select an image to add metadata</p>
                </CardContent>
              </Card>
            )}

            {/* Upload Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>High-resolution images (minimum 800x600) work best for AI analysis</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Add metadata to improve annotation accuracy and cultural context</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Images will be processed by AI before expert review</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Ensure you have rights to upload and annotate the images</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
