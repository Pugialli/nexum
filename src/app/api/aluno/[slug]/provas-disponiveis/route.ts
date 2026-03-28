import { NextResponse } from "next/server"
import { getProvasDisponiveis } from "./get-provas-disponiveis"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const provasDisponiveis = await getProvasDisponiveis((await params).slug)

  return NextResponse.json(provasDisponiveis)
}