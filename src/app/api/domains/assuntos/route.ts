import { NextResponse } from 'next/server'

import { createAssunto, type CreateAssuntoProps } from './create-assunto'
import { getAssuntos } from './get-assuntos'

export async function GET() {
  const response = await getAssuntos()

  return NextResponse.json(response)
}

export async function POST(request: Request) {
  const formData: CreateAssuntoProps = await request.json()

  const response = await createAssunto(formData)

  return NextResponse.json(response)
}
