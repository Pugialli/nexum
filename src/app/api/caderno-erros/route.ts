import { NextRequest, NextResponse } from 'next/server'
import { updateErro, type UpdateErroProps } from './update-erro'

export async function PATCH(request: NextRequest,) {
  const data: UpdateErroProps = await request.json()

  const erro = await updateErro(data)

  return NextResponse.json(erro, { status: 201 })
}