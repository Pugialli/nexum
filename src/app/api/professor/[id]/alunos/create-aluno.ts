import { prisma } from '@/lib/prisma'
import { createSlug } from '@/utils/create-slug'
import bcrypt from 'bcryptjs'

export interface CreateAlunoProps {
  nome: string
  email: string
  idProfessor: string
}

export async function createAluno({
  nome,
  email,
  idProfessor,
}: CreateAlunoProps) {
  const slug = createSlug(email)
  const password = 'nexum123'

  const passwordHash = await bcrypt.hash(password, 10)

  return await prisma.user.create({
    data: {
      nome,
      email,
      slug,
      passwordHash,
      idProfessor,
    },
  })
}
