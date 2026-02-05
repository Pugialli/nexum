import { NextResponse, type NextRequest } from 'next/server'

import { completeAluno, type CompleteAlunoProps } from './complete-aluno'

export async function PUT(request: NextRequest) {
  const formData: CompleteAlunoProps = await request.json()

  const aluno = await completeAluno(formData)

  return NextResponse.json(aluno, { status: 201 })
}
