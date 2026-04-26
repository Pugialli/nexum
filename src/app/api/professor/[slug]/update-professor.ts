import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export interface UpdateProfessorProps {
  slug: string
  nome: string
  email: string
  telefone?: string
  password?: string
  formacao?: string
  resetPassword?: boolean
}

export async function updateProfessor({
  nome,
  slug,
  email,
  telefone,
  password,
  formacao,
  resetPassword,
}: UpdateProfessorProps) {
  const user = await prisma.user.update({
    where: { slug },
    data: {
      nome,
      email,
      ...(resetPassword !== undefined && { resetPassword }),
    },
  })

  if (password) {
    const passwordHash = await bcrypt.hash(password, 10)
    await prisma.account.updateMany({
      where: { userId: user.id, providerId: 'credential' },
      data: { password: passwordHash },
    })
  }

  return await prisma.professor.update({
    where: { idUser: user.id },
    data: {
      telefone,
      formacao,
    },
  })
}