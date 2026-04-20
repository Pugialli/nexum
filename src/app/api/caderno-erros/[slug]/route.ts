import { NextResponse } from 'next/server'
import { getErros } from './get-erros'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params

  const erros = await getErros({ slug })

  return NextResponse.json(erros, { status: 201 })
}