import { type NextRequest, NextResponse } from 'next/server';
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