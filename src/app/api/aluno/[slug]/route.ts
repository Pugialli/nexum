import { NextResponse, type NextRequest } from "next/server"
import { updateAluno, type UpdateAlunoProps } from "./update-aluno"

export async function PUT(request: NextRequest) {
  const formData: UpdateAlunoProps = await request.json()

  const aluno = await updateAluno(formData)

  return NextResponse.json(aluno, { status: 201 })
}