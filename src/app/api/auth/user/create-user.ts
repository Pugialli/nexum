import { prisma } from '@/lib/prisma'
import { createSlug } from '@/utils/create-slug'
import bcrypt from 'bcryptjs'

export interface CreateUserProps {
  nome: string
  email: string
  dataNascimento: string
  password: string
}

export async function createUser({
  nome,
  email,
  dataNascimento,
  password,
}: CreateUserProps) {
  const slug = createSlug(email)
  const passwordHash = await bcrypt.hash(password, 10)

  return await prisma.user.create({
    data: {
      nome,
      email,
      slug,
      passwordHash,
      dataNascimento,},
  })
}
