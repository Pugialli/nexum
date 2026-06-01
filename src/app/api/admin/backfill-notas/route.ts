import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST() {
  const provaAlunos = await prisma.provaAluno.findMany({
    select: {
      id: true,
      gcp: true,
      prova: { select: { notaMinima: true, notaMaxima: true, peso1: true, peso2: true, peso3: true, peso4: true, peso5: true } },
      respostas: { select: { resultado: true, questao: { select: { dificuldade: true } } } },
    },
  })

  if (provaAlunos.length === 0) {
    return NextResponse.json({ message: 'Nenhum registro encontrado', updated: 0 })
  }

  await Promise.all(
    provaAlunos.map((pa) => {
      const pesos: Record<number, number> = {
        1: pa.prova.peso1,
        2: pa.prova.peso2,
        3: pa.prova.peso3,
        4: pa.prova.peso4,
        5: pa.prova.peso5,
      }
      const rawScore = pa.respostas.reduce((total, r) => {
        if (!r.resultado) return total
        return total + (pesos[r.questao.dificuldade] ?? 0)
      }, 0)
      const nota = pa.prova.notaMinima + rawScore
      const range = pa.prova.notaMaxima - pa.prova.notaMinima
      const gcp = range > 0
        ? Math.round(((nota - pa.prova.notaMinima) / range) * 100 * 10) / 10
        : 0
      return prisma.provaAluno.update({
        where: { id: pa.id },
        data: { nota, gcp },
      })
    })
  )

  return NextResponse.json({ message: 'Notas e GCP recalculados com sucesso', updated: provaAlunos.length })
}
