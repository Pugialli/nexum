import { NextResponse, type NextRequest } from "next/server"
import { createUser, type CreateUserProps } from "./create-user"

export async function POST(request: NextRequest) {
  const formData: CreateUserProps = await request.json()

  const aluno = await createUser(formData)

  return NextResponse.json(aluno, { status: 201 })
}