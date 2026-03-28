import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export interface UpdateAlunoProps {
  nome: string
  email: string
  dataNascimento: string
  telefone?: string
  password?: string
  carreira: string
  resetPassword?: boolean
}

export async function updateAluno({
  nome,
  email,
  dataNascimento,
  telefone,
  password,
  carreira,
  resetPassword,
}: UpdateAlunoProps) {
  const data: any = {
    nome,
    dataNascimento: new Date(dataNascimento),
    telefone,
    carreiraValue: carreira,
  }

  // Só atualiza a senha se foi fornecida
  if (password) {
    const passwordHash = await bcrypt.hash(password, 10)
    data.passwordHash = passwordHash
  }

  // Atualiza o resetPassword se foi fornecido
  if (resetPassword !== undefined) {
    data.resetPassword = resetPassword
  }

  return await prisma.user.update({
    where: {
      email,
    },
    data,
  })
}