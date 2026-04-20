import { prisma } from "@/lib/prisma"

export interface GetCadernoErrosResponse {
  idProvaAluno: string
  idQuestao: string
  questaoNumero: number
  questaoGabarito: string
  provaAno: string
  assunto: string
  revisao1: boolean
  revisao2: boolean
  revisao3: boolean
}


export interface GetCadernoErrosProps {
  slug: string
}

export async function getErros({ slug }: GetCadernoErrosProps): Promise<GetCadernoErrosResponse[]> {
  const erros = await prisma.cadernoErro.findMany({
    where: {
      resposta: {
        provaAluno: {
          aluno: { user: { slug, } },
        },
      },
    },
    include: {
      resposta: {
        include: {
          questao: {
            include: { assunto: true, prova: true },
          },
        },
      },
    },
  })

  return erros.map((erro) => ({
    idProvaAluno: erro.idProvaAluno,
    idQuestao: erro.idQuestao,
    questaoNumero: erro.resposta.questao.numero,
    questaoGabarito: erro.resposta.questao.gabarito,
    provaAno: erro.resposta.questao.prova?.ano ?? '—',
    assunto: erro.resposta.questao.assunto.label,
    revisao1: erro.revisao1,
    revisao2: erro.revisao2,
    revisao3: erro.revisao3,
  }))
}