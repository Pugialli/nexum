import z from "zod"

export const signInSchema = z.object({
  email: z.email({ error: 'Email inválido' }),
  password: z.string().min(1, { error: 'Senha inválida' }),
})