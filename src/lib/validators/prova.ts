import { z } from 'zod'

export const respostaSchema = z.object({
  questaoId: z.string().min(3, 'ID da questão inválido'),
  resposta: z.enum(['A', 'B', 'C', 'D', 'E'], {
    message: 'Resposta deve ser A, B, C, D ou E',
  }),
})

export const submitProvaSchema = z.object({
  provaId: z.string().min(3, 'ID da prova inválido'),
  respostas: z
    .array(respostaSchema)
    .max(45, 'Número máximo de questões excedido')
    .default([]),
})

export type SubmitProvaInput = z.infer<typeof submitProvaSchema>