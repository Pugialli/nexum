import { NextResponse } from 'next/server'

import { getHabilidades } from './get-habilidades'

export async function GET() {
  const response = await getHabilidades()

  return NextResponse.json(response)
}
