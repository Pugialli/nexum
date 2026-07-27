import { NextResponse } from 'next/server'
import { getExAlunos } from './get-exalunos'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const response = await getExAlunos({ slug: (await params).slug })
  return NextResponse.json(response)
}
