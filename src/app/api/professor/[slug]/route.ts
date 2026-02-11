import { NextResponse } from 'next/server'

import { getProfessor } from './get-professor'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const response = await getProfessor({ slug: (await params).slug })

  return NextResponse.json(response)
}
