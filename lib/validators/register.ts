import { z } from "zod"

export const registerSchema = z
  .object({
    nome: z.string().min(3, "Nome muito curto"),
    email: z.email("Email inválido"),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres"),
    confirmPassword: z.string(),
    telefone: z.string().optional(),
    carreira: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })

export type RegisterInput = z.infer<typeof registerSchema>
