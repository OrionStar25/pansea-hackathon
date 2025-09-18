import { type NextRequest, NextResponse } from "next/server"
import { addUploadedImage, type UploadedImage } from "@/lib/storage"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll("files") as File[]
    const metadata = JSON.parse((formData.get("metadata") as string) || "{}")

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const processedFiles = await Promise.all(
      files.map(async (file, index) => {
        const imageId = `uploaded_${Date.now()}_${index}`

        const arrayBuffer = await file.arrayBuffer()
        const base64 = Buffer.from(arrayBuffer).toString("base64")
        const dataUrl = `data:${file.type};base64,${base64}`

        const uploadedImage: UploadedImage = {
          id: imageId,
          title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
          image: dataUrl, // Use actual image data instead of placeholder
          status: "processing",
          confidence: 0,
          aiAnnotation: "",
          language: metadata[file.name]?.language || "English",
          collection: metadata[file.name]?.collection || "Uploaded Images",
          uploadedAt: new Date().toISOString().split("T")[0],
          originalFileName: file.name,
          fileSize: file.size,
          fileType: file.type,
        }

        addUploadedImage(uploadedImage)

        // Simulate AI processing after a delay
        setTimeout(() => {
          // This would trigger actual AI processing in production
        }, 2000)

        return {
          id: imageId,
          name: file.name,
          size: file.size,
          type: file.type,
          url: dataUrl, // Return actual image URL
          metadata: metadata[file.name] || {},
          status: "uploaded",
          aiAnnotationStatus: "processing",
        }
      }),
    )

    return NextResponse.json({
      success: true,
      message: `Successfully uploaded ${files.length} images`,
      files: processedFiles,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 })
  }
}
