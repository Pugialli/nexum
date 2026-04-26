import { z } from "zod"

export const professorProfileSchema = z
  .object({
    slug: z.string().optional(),
    nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
    email: z.email({ message: 'Email inválido' }),
    telefone: z.string().optional(),
    formacao: z.string().optional(),
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