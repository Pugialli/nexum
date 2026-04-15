import { type NextRequest, NextResponse } from 'next/server';
import { deleteProvaAluno } from './delete-prova-aluno';
import { registrarProva, type RegistrarProvaProps } from './registrar-prova';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; id: string }> }
) {
  try {
    const { slug, id } = await params
    const { respostas } = await request.json()

    const prova: RegistrarProvaProps = {
      alunoSlug: slug,
      provaId: id,
      respostas,
    }

    const response = await registrarProva(prova)

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Erro ao enviar prova:', error)
    return NextResponse.json(
      { message: 'Erro ao enviar prova' },
      { status: 500 }
    )
  }
}


export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; id: string }> }
) {
  try {
    const { slug, id } = await params

    const response = await deleteProvaAluno(slug, id)

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('Erro ao remover prova:', error)
    return NextResponse.json(
      { message: 'Erro ao remover prova' },
      { status: 500 }
    )
  }
}