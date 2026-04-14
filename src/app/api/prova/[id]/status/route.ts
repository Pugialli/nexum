import { NextResponse } from "next/server"
import { updateProvaStatus } from "./update-prova-status"

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  const prova = await updateProvaStatus({ id })

  return NextResponse.json(prova, { status: 200 })
}