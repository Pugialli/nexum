import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'


export interface UpdateAlunoProps {
  nome: string
  email: string
  dataNascimento: string
  telefone: string
  password: string
  carreira: string
}

export async function updateAluno({
  nome,
  email,
  dataNascimento,
  telefone,
  password,
  carreira,
}: UpdateAlunoProps) {
  const passwordHash = await bcrypt.hash(password, 10)

  return await prisma.user.update({
    where: {
      email,
    },
    data: {
      nome,
      dataNascimento,
      telefone,
      passwordHash,
      carreiraValue: carreira,
    },
  })
}
