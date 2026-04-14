import { provaSchema } from '@/lib/validators/prova'
import { NextResponse } from 'next/server'
import { createProva } from './create-prova'
import { getProvas } from './get-provas'

export async function GET() {
  const response = await getProvas()
  return NextResponse.json(response)
}

export async function POST(request: Request) {
  const body = await request.json()

  const result = provaSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { message: 'Dados inválidos', errors: result.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const prova = await createProva(result.data)

  return NextResponse.json(prova, { status: 201 })
}