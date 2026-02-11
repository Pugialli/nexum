import { api } from './api-client'

export interface RegistrarProvaRequest {
  alunoSlug: string
  idProva: string
  respostas: {
    questaoNumero: number  // Mudado de idQuestao para questaoNumero
    resposta: string
  }[]
}

export async function registrarProva({
  alunoSlug,
  idProva,
  respostas,
}: RegistrarProvaRequest) {
  await api.post(`aluno/${alunoSlug}/prova/${idProva}`, {
    json: { respostas },
  })
}