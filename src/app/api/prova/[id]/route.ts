import { provaSchema } from '@/lib/validators/prova'
import { NextResponse } from 'next/server'
import { getProva } from './get-prova'
import { updateProva } from './update-prova'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const prova = await getProva(id)
  return NextResponse.json(prova)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()

  const result = provaSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { message: 'Dados inválidos', errors: result.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const prova = await updateProva(id, result.data)

  return NextResponse.json(prova)
}