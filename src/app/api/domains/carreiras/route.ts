import { NextResponse } from 'next/server'

import { getCarreiras } from './get-carreiras'

export async function GET() {
  const response = await getCarreiras()

  return NextResponse.json(response)
}
