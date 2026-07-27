import type { GetAlunosProfessor } from '@/http/get-alunos'
import { prisma } from '@/lib/prisma'
import { dateToString } from '@/utils/string-to-date'

interface GetExAlunosProps {
  slug: string
}

export async function getExAlunos({ slug }: GetExAlunosProps): Promise<GetAlunosProfessor[]> {
  const professor = await prisma.user.findUnique({
    where: { slug },
    select: { id: true },
  })
  if (!professor) throw new Error('Professor não encontrado')

  const exalunos = await prisma.aluno.findMany({
    where: {
      idProfessor: professor.id,
      user: { role: 'EXALUNO' },
    },
    select: {
      user: {
        select: {
          nome: true,
          email: true,
          slug: true,
          createdAt: true,
          resetPassword: true,
        },
      },
      provaAlunos: {
        select: {
          gcp: true,
          prova: {
            select: {
              id: true,
              ano: true,
            },
          },
        },
      },
    },
    orderBy: {
      user: { nome: 'asc' },
    },
  })

  return exalunos.map((aluno) => {
    const gcpMedio =
      aluno.provaAlunos.length > 0
        ? Math.round(
            aluno.provaAlunos.reduce((sum, pa) => sum + pa.gcp, 0) / aluno.provaAlunos.length,
          )
        : 0
    return {
      slug: aluno.user.slug,
      nome: aluno.user.nome,
      email: aluno.user.email,
      resetPassword: aluno.user.resetPassword,
      gcpMedio,
      dataIngresso: dateToString(aluno.user.createdAt),
      provas: aluno.provaAlunos.map((pa) => ({
        id: pa.prova.id,
        nome: pa.prova.ano,
        gcp: pa.gcp,
      })),
    }
  })
}
