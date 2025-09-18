import { NextResponse } from "next/server"
import { getUploadedImages } from "@/lib/storage"

export async function GET() {
  try {
    const images = getUploadedImages()
    return NextResponse.json({ success: true, images })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch images" }, { status: 500 })
  }
}
