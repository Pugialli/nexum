import { prisma } from "@/lib/prisma"

export interface ProvaResult {
  test: string       // número sequencial para o eixo X (ex: "1", "2"...)
  provaId: string
  ano: string
  score: number      // total de acertos
  gcp: number        // valor do GCP da ProvaAluno
  date: string       // data de realização formatada
}

export type DifficultyLabel = 'Muito fácil' | 'Fácil' | 'Médio' | 'Difícil' | 'Muito difícil'

const DIFFICULTY_MAP: Record<number, DifficultyLabel> = {
  1: 'Muito fácil',
  2: 'Fácil',
  3: 'Médio',
  4: 'Difícil',
  5: 'Muito difícil',
}

export function toDifficultyLabel(value: number): DifficultyLabel {
  return DIFFICULTY_MAP[value] ?? 'Médio'
}

export interface SimuladoError {
  number: number
  difficulty: DifficultyLabel
  skill: string
  subject: string
}

export interface HabilidadeResult {
  skill: string         // ex: "H12"
  errorRate: number     // percentual de erro (0–100)
  errorCount: number    // total de erros
}

export interface DashboardData {
  provas: ProvaResult[]
  errosPorProva: Record<string, SimuladoError[]>
  habilidades: HabilidadeResult[]
}

export async function getDashboardBySlug(slug: string): Promise<DashboardData | null> {
  // 1. Verifica se o usuário existe e é aluno
  const user = await prisma.user.findUnique({
    where: { slug },
    select: { id: true, role: true },
  })

  if (!user || user.role === 'PROFESSOR') return null

  // 2. Busca todas as ProvaAluno do aluno com respostas + questão + habilidade + assunto
  const provaAlunos = await prisma.provaAluno.findMany({
    where: { idAluno: user.id },
    orderBy: { createdAt: 'asc' },
    include: {
      prova: {
        select: { ano: true },
      },
      respostas: {
        include: {
          questao: {
            include: {
              habilidade: { select: { value: true, descricao: true } },
              assunto: { select: { label: true } },
            },
          },
        },
      },
    },
  })

  if (provaAlunos.length === 0) {
    return { provas: [], errosPorProva: {}, habilidades: [] }
  }

  // 3. Monta histórico de provas
  const provas: ProvaResult[] = provaAlunos.map((pa, index) => {
    const acertos = pa.respostas.filter((r) => r.resultado).length
    return {
      test: String(index + 1),
      provaId: pa.idProva,
      ano: pa.prova.ano,
      score: acertos,
      gcp: pa.gcp,
      date: pa.createdAt.toLocaleDateString('pt-BR'),
    }
  })

  // 4. Monta erros por prova (indexed pelo número sequencial "test")
  const errosPorProva: Record<string, SimuladoError[]> = {}
  provaAlunos.forEach((pa, index) => {
    const key = String(index + 1)
    errosPorProva[key] = pa.respostas
      .filter((r) => !r.resultado)
      .map((r) => ({
        number: r.questao.numero,
        difficulty: toDifficultyLabel(r.questao.dificuldade),
        skill: `H${r.questao.habilidade.value}`,
        subject: r.questao.assunto.label,
      }))
  })

  // 5. Agrega habilidades defasadas (soma de erros por habilidade, em todas as provas)
  const habilidadeMap = new Map<string, { errorCount: number; totalCount: number }>()

  for (const pa of provaAlunos) {
    for (const r of pa.respostas) {
      const skillKey = `H${r.questao.habilidade.value}`
      const existing = habilidadeMap.get(skillKey) ?? { errorCount: 0, totalCount: 0 }
      habilidadeMap.set(skillKey, {
        errorCount: existing.errorCount + (r.resultado ? 0 : 1),
        totalCount: existing.totalCount + 1,
      })
    }
  }

  const habilidades: HabilidadeResult[] = Array.from(habilidadeMap.entries())
    .map(([skill, { errorCount, totalCount }]) => ({
      skill,
      errorCount,
      errorRate: totalCount > 0 ? Math.round((errorCount / totalCount) * 100) : 0,
    }))
    .sort((a, b) => b.errorRate - a.errorRate)

  return { provas, errosPorProva, habilidades }
}