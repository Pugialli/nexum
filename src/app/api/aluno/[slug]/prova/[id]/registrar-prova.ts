import { prisma } from '@/lib/prisma'
import { getAlunoSlug } from '../../get-aluno'

export interface RegistrarProvaProps {
  alunoSlug: string
  provaId: string
  respostas: {
    questaoNumero: number
    resposta: string
  }[]
}

export interface RegistrarProvaResponse {
  message: string
  total: number
  acertos: number
  naoRespondidas: number
  gcp: number
}

export async function registrarProva({
  alunoSlug,
  provaId,
  respostas,
}: RegistrarProvaProps): Promise<RegistrarProvaResponse> {
  const aluno = await getAlunoSlug(alunoSlug)

  if (aluno === null) {
    throw new Error('Aluno não encontrado')
  }
  const alunoId = aluno.id

  // Busca todas as questões da prova com gabarito e dificuldade
  const questoes = await prisma.questao.findMany({
    where: { idProva: provaId },
    select: {
      id: true,
      numero: true,
      gabarito: true,
      dificuldade: true,
    },
  })

  // Busca os pesos e limites da prova
  const prova = await prisma.prova.findUnique({
    where: { id: provaId },
    select: {
      peso1: true,
      peso2: true,
      peso3: true,
      peso4: true,
      peso5: true,
    },
  })

  if (!prova) {
    throw new Error('Prova não encontrada')
  }

  const pesosPorDificuldade: Record<number, number> = {
    1: prova.peso1,
    2: prova.peso2,
    3: prova.peso3,
    4: prova.peso4,
    5: prova.peso5,
  }

  const provaAluno = await prisma.provaAluno.create({
    data: {
      idAluno: alunoId,
      idProva: provaId,
      gcp: 0, // será atualizado abaixo
    },
  })

  // Mapa das respostas enviadas: número da questão -> resposta
  const respostasMap = new Map(
    respostas.map((r) => [r.questaoNumero, r.resposta])
  )

  // Prepara respostas para inserção (todas as questões da prova)
  const respostasParaInserir = questoes.map((questao) => {
    const respostaAluno = respostasMap.get(questao.numero)
    const respostaFinal = respostaAluno ?? 'N/A'
    const acertou = respostaAluno ? questao.gabarito === respostaAluno : false

    return {
      idQuestao: questao.id,
      idProvaAluno: provaAluno.id,
      resposta: respostaFinal,
      resultado: acertou,
      dificuldade: questao.dificuldade,
    }
  })

  // Calcula o GCP: soma dos pesos das questões acertadas por dificuldade
  const gcp = respostasParaInserir.reduce((total, r) => {
    if (!r.resultado) return total
    return total + (pesosPorDificuldade[r.dificuldade] ?? 0)
  }, 0)

  // Insere as respostas e atualiza o GCP em paralelo
  await Promise.all([
    prisma.resposta.createMany({
      data: respostasParaInserir.map((r) => ({
        idQuestao: r.idQuestao,
        idProvaAluno: r.idProvaAluno,
        resposta: r.resposta,
        resultado: r.resultado,
      })),
    }),
    prisma.provaAluno.update({
      where: { id: provaAluno.id },
      data: { gcp },
    }),
  ])

  const acertos = respostasParaInserir.filter((r) => r.resultado).length
  const naoRespondidas = respostasParaInserir.filter((r) => r.resposta === 'N/A').length

  return {
    message: 'Prova enviada com sucesso',
    total: respostasParaInserir.length,
    acertos,
    naoRespondidas,
    gcp,
  }
}