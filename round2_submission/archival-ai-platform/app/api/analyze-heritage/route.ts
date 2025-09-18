import { type NextRequest, NextResponse } from "next/server"
import { InferenceClient } from "@huggingface/inference"

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, location, date, language = "en" } = await request.json()

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 })
    }

    console.log("[v0] Processing heritage image:", imageUrl)

    const client = new InferenceClient(process.env.HF_TOKEN)

    const chatCompletion = await client.chatCompletion({
      provider: "publicai",
      model: "aisingapore/Gemma-SEA-LION-v4-27B-IT",
      messages: [
        {
          role: "user",
          content: [
            "Analyze this historical photograph of Singapore and provide expert heritage analysis.",
            "",
            `Location: ${location || "Singapore (location to be determined)"}`,
            `Date: ${date || "Date to be determined from visual analysis"}`,
            "",
            "Please provide a comprehensive annotation suitable for museum exhibit or academic publication, focusing on:",
            "- Architectural heritage and styles",
            "- Urban development indicators",
            "- Cultural and social context",
            "- Historical significance",
            "",
            `Image URL: ${imageUrl}`,
          ].join("\n"),
        },
      ],
    })

    const analysis = chatCompletion.choices[0].message.content

    console.log("[v0] Generated caption:", analysis)

    return NextResponse.json({
      analysis,
      language,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Heritage analysis error:", error)
    return NextResponse.json(
      {
        error: "Failed to analyze heritage content",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
