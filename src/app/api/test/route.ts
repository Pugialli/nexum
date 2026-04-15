import { createAnoSlug } from "@/utils/create-slug"
import { NextResponse } from "next/server"

export async function GET() {
  const prova = '2023.2'
  const response = createAnoSlug(prova)
  return NextResponse.json(response)
}