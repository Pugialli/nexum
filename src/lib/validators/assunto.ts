import { z } from 'zod'

export const createAssuntoSchema = z.object({
  value: z
    .string()
    .min(1, 'ID obrigatório'),
  label: z.string().min(1, 'Nome obrigatório'),
})