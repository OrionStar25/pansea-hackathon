export const env = {
  HF_TOKEN: process.env.HF_TOKEN,
} as const

// Validation function to ensure required environment variables are set
export function validateEnv() {
  const missing = []

  if (!env.HF_TOKEN) {
    missing.push("HF_TOKEN")
  }

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`)
  }
}
