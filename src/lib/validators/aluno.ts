import { z } from "zod"

export const createAlunoSchema = z
  .object({
    nome: z.string().min(4, { error: 'O nome deve ter ao menos 4 letras' }),
    email: z.email({ error: 'Email inválido' }),
  })

export const completeProfileSchema = z
  .object({
    nome: z.string().min(3, "Nome muito curto"),
    email: z.email("Email inválido"),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres"),
    confirmPassword: z.string(),
    dataNascimento: z.string(),
    telefone: z.string().optional(),
    carreira: z.string().optional(),
    slug: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })

export type CreateAlunoInput = z.infer<typeof createAlunoSchema>
export type CompleteProfileInput = z.infer<typeof completeProfileSchema>

