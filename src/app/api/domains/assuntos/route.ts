import { NextResponse } from 'next/server'

import { getAssuntos } from './get-assuntos'

export async function GET() {
  const response = await getAssuntos()

  return NextResponse.json(response)
}
