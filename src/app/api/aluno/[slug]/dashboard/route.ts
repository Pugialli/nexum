import { NextResponse } from 'next/server'
import { getDashboardBySlug } from './get-dashboard'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const data = await getDashboardBySlug(slug)

  if (!data) {
    return NextResponse.json({ error: 'Aluno não encontrado' }, { status: 404 })
  }

  return NextResponse.json(data)
}