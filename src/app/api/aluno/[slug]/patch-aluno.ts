import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function patchAlunoNome(slug: string, nome: string) {
  return prisma.user.update({
    where: { slug },
    data: { nome },
  })
}

export async function arquivarAluno(slug: string) {
  return prisma.user.update({
    where: { slug },
    data: { role: 'EXALUNO' },
  })
}

export async function resetarSenhaAluno(slug: string) {
  const passwordHash = await bcrypt.hash('nexum123', 10)

  const user = await prisma.user.update({
    where: { slug },
    data: { resetPassword: true },
    select: { id: true },
  })

  await prisma.account.updateMany({
    where: { userId: user.id, providerId: 'credential' },
    data: { password: passwordHash },
  })
}
