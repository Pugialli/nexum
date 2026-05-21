import { NextResponse, type NextRequest } from "next/server"
import { deleteAluno } from "./delete-aluno"
import { getAlunoSlug } from "./get-aluno"
import { arquivarAluno, patchAlunoNome, resetarSenhaAluno } from "./patch-aluno"
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params
    const body = await request.json()

    if (body.action === 'arquivar') {
      await arquivarAluno(slug)
    } else if (body.action === 'resetar-senha') {
      await resetarSenhaAluno(slug)
    } else if (typeof body.nome === 'string') {
      await patchAlunoNome(slug, body.nome)
    } else {
      return NextResponse.json({ message: 'Requisição inválida' }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('PATCH /aluno error:', err)
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params
    await deleteAluno(slug)
    return new NextResponse(null, { status: 204 })
  } catch (err) {
    console.error('DELETE /aluno error:', err)
    return NextResponse.json({ message: 'Erro ao excluir aluno' }, { status: 500 })
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