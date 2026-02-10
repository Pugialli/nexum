import { NextResponse } from 'next/server'

import { getCarreiras } from './get-carreiras'

export async function GET(
  request: Request,
) {
  const response = await getCarreiras()

  const normalizedResponse = response.map((carreira) => ({
    label: carreira.carreiraLabel,
    value: carreira.carreiraValue,
  }))

  return NextResponse.json(normalizedResponse)
}
