import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import type { Role } from '@prisma/client'

export interface GetProfileResponse {
  nome: string
  slug: string
  email: string
  avatarUrl: string | null
  role: Role
}

interface GetProfileProps {
  id: string
}

export async function getProfile({ id }: GetProfileProps) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      nome: true,
      email: true,
      slug: true,
      avatarUrl: true,
      role: true,
    },
  })

  if (!user) {
    return NextResponse.json('', {
      status: 401,
      statusText: 'User or password incorrect',
    })
  }

  return { user }
}
