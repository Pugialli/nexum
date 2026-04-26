import { NextResponse, type NextRequest } from "next/server"
import { getAlunoSlug } from "./get-aluno"
import { updateAluno, type UpdateAlunoProps } from "./update-aluno"

export async function PUT(request: NextRequest) {
  try {
    const formData: UpdateAlunoProps = await request.json()
    const aluno = await updateAluno(formData)
    return NextResponse.json(aluno, { status: 200 })
  } catch (err) {
    console.error("PUT /aluno error:", err)

    // Erro de record not found do Prisma
    if ((err as { code?: string }).code === "P2025") {
      return NextResponse.json(
        { message: "Aluno não encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const aluno = await getAlunoSlug((await params).slug)
    return NextResponse.json(aluno)
  } catch (err) {
    console.error("GET /aluno error:", err)
    return NextResponse.json(
      { message: "Aluno não encontrado" },
      { status: 404 }
    )
  }
}