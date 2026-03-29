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

interface UpdateAlunoData {
  nome: string
  dataNascimento: Date
  telefone?: string
  carreiraValue: string
  passwordHash?: string
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
  const data: UpdateAlunoData = {
    nome,
    dataNascimento: new Date(dataNascimento),
    telefone,
    carreiraValue: carreira,
  }

  if (password) {
    data.passwordHash = await bcrypt.hash(password, 10)
  }

  if (resetPassword !== undefined) {
    data.resetPassword = resetPassword
  }

  return await prisma.user.update({
    where: { email },
    data,
  })
}