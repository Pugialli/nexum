import { prisma } from '@/lib/prisma'
import { createSlug } from '@/utils/create-slug'
import bcrypt from 'bcryptjs'

export interface CreateAlunoProps {
  nome: string
  email: string
  slugProfessor: string
}

export async function createAluno({
  nome,
  email,
  slugProfessor,
}: CreateAlunoProps) {
  const slug = createSlug(email)
  const password = 'nexum123'

  const passwordHash = await bcrypt.hash(password, 10)

  const professor = await prisma.user.findUnique({
    where: {
      slug: slugProfessor,
    }
  })

  if(!professor) {
    throw new Error('Professor not found')
  }

  return await prisma.user.create({
    data: {
      nome,
      email,
      slug,
      passwordHash,
      idProfessor: professor.id,
    },
  })
}
