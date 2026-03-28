import { NextResponse, type NextRequest } from "next/server"
import { getAlunoSlug } from "./get-aluno"
import { updateAluno, type UpdateAlunoProps } from "./update-aluno"

export async function PUT(request: NextRequest) {
  const formData: UpdateAlunoProps = await request.json()

  const aluno = await updateAluno(formData)

  return NextResponse.json(aluno, { status: 201 })
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const aluno = await getAlunoSlug((await params).slug)

  return NextResponse.json(aluno)
}
