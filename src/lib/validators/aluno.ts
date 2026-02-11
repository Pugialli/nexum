import { z } from "zod"

export const createAlunoSchema = z
  .object({
    nome: z.string().min(4, { error: 'O nome deve ter ao menos 4 letras' }),
    email: z.email({ error: 'Email inválido' }),
  })

export const completeProfileSchema = z
  .object({
    slug: z.string().optional(),
    nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
    email: z.email({ message: 'Email inválido' }),
    dataNascimento: z.string().min(1, 'Data de nascimento é obrigatória'),
    telefone: z.string().optional(),
    carreira: z.string().min(1, 'Selecione uma carreira'),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.password && data.password.length > 0) {
        return data.password.length >= 6
      }
      return true
    },
    {
      message: 'Senha deve ter no mínimo 6 caracteres',
      path: ['password'],
    }
  )
  .refine(
    (data) => {
      if (data.password && data.password.length > 0) {
        return data.password === data.confirmPassword
      }
      return true
    },
    {
      message: 'As senhas não coincidem',
      path: ['confirmPassword'],
    }
  )