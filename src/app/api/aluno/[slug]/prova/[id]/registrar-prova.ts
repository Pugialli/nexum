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
}

export async function registrarProva({
  alunoSlug,
  provaId,
  respostas,
}: RegistrarProvaProps): Promise<RegistrarProvaResponse> {
  const aluno = await getAlunoSlug(alunoSlug)

  if(aluno === null) {
    throw new Error('Aluno não encontrado')
  }
  const alunoId = aluno.id

  // Busca todas as questões da prova com gabaritos
  const questoes = await prisma.questao.findMany({
    where: {
      idProva: provaId,
    },
    select: {
      id: true,
      numero: true,
      gabarito: true,
    },
  })

  // Cria um mapa das respostas enviadas (número -> resposta)
  const respostasMap = new Map(
    respostas.map((r) => [r.questaoNumero, r.resposta])
  )

  // Prepara dados para inserção (TODAS as questões da prova)
  const respostasParaInserir = questoes.map((questao) => {
    const respostaAluno = respostasMap.get(questao.numero)
    const respostaFinal = respostaAluno || 'N/A'
    
    return {
      idAluno: alunoId,
      idQuestao: questao.id,  // Usa o UUID da questão
      resposta: respostaFinal,
      resultado: respostaAluno ? questao.gabarito === respostaAluno : false,
    }
  })

  // Insere todas as respostas
  await prisma.resposta.createMany({
    data: respostasParaInserir,
  })

  const acertos = respostasParaInserir.filter((r) => r.resultado).length
  const naoRespondidas = respostasParaInserir.filter((r) => r.resposta === 'N/A').length

  return {
    message: 'Prova enviada com sucesso',
    total: respostasParaInserir.length,
    acertos,
    naoRespondidas,
  }
}