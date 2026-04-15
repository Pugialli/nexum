import { prisma } from '@/lib/prisma'
import type { ProvaSchema } from '@/lib/validators/prova'
import { createAnoSlug } from '@/utils/create-slug'

export async function createProva(data: ProvaSchema) {
  const provaId = createAnoSlug(data.ano)
  return await prisma.prova.create({
    data: {
      id: provaId,
      ano: data.ano,
      notaMinima: data.notaMinima,
      notaMaxima: calcularNotaMaxima(data),
      peso1: data.peso1,
      peso2: data.peso2,
      peso3: data.peso3,
      peso4: data.peso4,
      peso5: data.peso5,
      questoes: {
        create: data.questoes.map((q) => ({
          numero: q.numero,
          gabarito: q.gabarito,
          dificuldade: q.dificuldade,
          habilidadeValue: q.habilidadeValue,
          assuntoValue: q.assuntoValue,
        })),
      },
    },
  })
}

function calcularNotaMaxima(data: ProvaSchema): number {
  const pesos = [data.peso1, data.peso2, data.peso3, data.peso4, data.peso5]
  return pesos.reduce((acc, peso, i) => {
    const dificuldade = i + 1
    const qtd = data.questoes.filter((q) => q.dificuldade === dificuldade).length
    return acc + qtd * peso
  }, data.notaMinima)
}