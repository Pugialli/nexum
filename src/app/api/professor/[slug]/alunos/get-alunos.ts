import type { GetAlunosProfessor } from '@/http/get-alunos'
import { prisma } from '@/lib/prisma'
import { dateToString } from '@/utils/string-to-date'



interface GetAlunosProps {
  slug: string
}
export async function getAlunos({ slug }: GetAlunosProps): Promise<GetAlunosProfessor[]> {
  const professor = await prisma.user.findUnique({
    where: { slug },
    select: { id: true },
  })
  if (!professor) {
    throw new Error('Professor não encontrado')
  }

  const alunos = await prisma.aluno.findMany({
    where: {
      idProfessor: professor.id,
    },
    select: {
      user: {
        select: {
          nome: true,
          slug: true,
          createdAt: true,
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
      user: {
        nome: 'asc',
      },
    },
  })

  return alunos.map((aluno) => {
    const gcpMedio = aluno.provaAlunos.length > 0 ?
      Math.round(aluno.provaAlunos.reduce((sum, pa) => sum + pa.gcp, 0) / aluno.provaAlunos.length) : 0
    return {
      slug: aluno.user.slug,
      nome: aluno.user.nome,
      gcpMedio,
      dataIngresso: dateToString(aluno.user.createdAt),
      provas: aluno.provaAlunos.map((pa) => ({
        id: pa.prova.id,
        nome: pa.prova.ano,
        gcp: pa.gcp
      }))
    }
  })
}