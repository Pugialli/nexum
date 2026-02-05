import { NextResponse } from 'next/server'

import { getProfessor } from './get-professor'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const response = await getProfessor({ id: (await params).id })

  return NextResponse.json(response)
}
