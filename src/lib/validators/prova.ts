import { z } from 'zod'

const questaoSchema = z.object({
  numero: z.coerce.number(),
  gabarito: z.enum(['A', 'B', 'C', 'D', 'E'], {
    message: 'Gabarito deve ser A, B, C, D ou E',
  }),
  dificuldade: z.coerce.number().min(1).max(5),
  habilidadeValue: z.coerce.number(),
  assuntoValue: z.string().min(1, 'Assunto é obrigatório'),
})

export const provaSchema = z.object({
  ano: z.string().min(1, 'Ano é obrigatório'),
  notaMinima: z.coerce.number().min(0, 'Nota mínima inválida'),
  peso1: z.coerce.number().min(1).default(1),
  peso2: z.coerce.number().min(1).default(1),
  peso3: z.coerce.number().min(1).default(1),
  peso4: z.coerce.number().min(1).default(1),
  peso5: z.coerce.number().min(1).default(1),
  questoes: z.array(questaoSchema).length(45, 'A prova deve ter exatamente 45 questões'),
})

export type ProvaSchema = z.infer<typeof provaSchema>