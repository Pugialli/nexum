import { NextResponse, type NextRequest } from 'next/server'
import { getProfessor } from './get-professor'
import { updateProfessor, type UpdateProfessorProps } from './update-professor'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const professor = await getProfessor((await params).slug)
    return NextResponse.json(professor)
  } catch {
    return NextResponse.json({ message: 'Professor não encontrado' }, { status: 404 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formData: UpdateProfessorProps = await request.json()
    const professor = await updateProfessor(formData)
    return NextResponse.json(professor, { status: 200 })
  } catch (err) {
    console.error('PUT /professor error:', err)

    if ((err as { code?: string }).code === 'P2025') {
      return NextResponse.json({ message: 'Professor não encontrado' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
}