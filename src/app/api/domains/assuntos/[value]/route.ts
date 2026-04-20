import { NextResponse } from "next/server"
import { deleteAssunto } from "./delete-assunto"
import { updateAssunto, type UpdateAssuntoProps } from "./update-assunto"

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ value: string }> },
) {
  const response = await deleteAssunto((await params).value)

  return NextResponse.json(response)
}


export async function PATCH(request: Request) {
  const formData: UpdateAssuntoProps = await request.json()

  const assunto = await updateAssunto(formData)

  return NextResponse.json(assunto, { status: 201 })
}