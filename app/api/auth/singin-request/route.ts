import { prisma } from '@/lib/prisma'
import { compare } from 'bcryptjs'
import { User } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

interface LoginProps {
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}

export async function POST(request: NextRequest) {
  const credendials: LoginProps = await request.json()

  const userExists = await prisma.user.findUnique({
    where: {
      email: credendials.email,
    },
  })

  if (!userExists) {
    return NextResponse.json('', { status: 404, statusText: 'User not found' })
  }

  const passwordCorrect = userExists.passwordHash
    ? await compare(credendials.password, userExists.passwordHash)
    : false

  if (!passwordCorrect) {
    return NextResponse.json('', {
      status: 401,
      statusText: 'User or password incorrect',
    })
  }

  const user: User = {
    name: userExists.nome,
    image: userExists.image ? userExists.image : null,
    email: userExists.email,
    id: userExists.id,
    role: userExists.role,
  }
  const response: AuthResponse = {
    user,
    token: '@nexumToken', // CRIAR O TOKEN
  }

  return NextResponse.json(response, { status: 200 })
}
