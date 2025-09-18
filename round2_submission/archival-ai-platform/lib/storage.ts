export interface UploadedImage {
  id: string
  title: string
  image: string
  status: "processing" | "ai-complete" | "expert-review" | "completed"
  confidence: number
  aiAnnotation: string
  expertAnnotation?: string
  language: string
  collection: string
  uploadedAt: string
  processedAt?: string
  originalFileName: string
  fileSize: number
  fileType: string
}

// Simple in-memory storage (in production, this would be a database)
const uploadedImages: UploadedImage[] = []

export function addUploadedImage(image: UploadedImage) {
  uploadedImages.push(image)
}

export function getUploadedImages(): UploadedImage[] {
  return uploadedImages
}

export function updateImageStatus(id: string, updates: Partial<UploadedImage>) {
  const index = uploadedImages.findIndex((img) => img.id === id)
  if (index !== -1) {
    uploadedImages[index] = { ...uploadedImages[index], ...updates }
  }
}
