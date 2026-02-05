import { type NextRequest, NextResponse } from 'next/server'

import { createAluno, type CreateAlunoProps } from './create-aluno'
import { getAlunos } from './get-alunos'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const response = await getAlunos({ idProfessor: (await params).id })

  return NextResponse.json(response)
}

export async function POST(request: NextRequest) {
  const formData: CreateAlunoProps = await request.json()

  const aluno = await createAluno(formData)

  return NextResponse.json(aluno, { status: 201 })
}
