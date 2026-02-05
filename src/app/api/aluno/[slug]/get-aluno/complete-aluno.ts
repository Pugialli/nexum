import { prisma } from '@/lib/prisma'

export interface CompleteAlunoProps {
  nome: string
  email: string
  dataNascimento: string
  telefone: string
  passwordHash: string
  carreira: string
}

export async function completeAluno({
  nome,
  email,
  dataNascimento,
  telefone,
  passwordHash,
  carreira,
}: CompleteAlunoProps) {
  return await prisma.user.update({
    where: {
      email,
    },
    data: {
      nome,
      dataNascimento,
      telefone,
      passwordHash,
      carreira,
    },
  })
}
