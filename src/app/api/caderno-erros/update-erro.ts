import { prisma } from "@/lib/prisma"


export interface UpdateErroProps {
  idProvaAluno: string
  idQuestao: string
  revisao1: boolean
  revisao2: boolean
  revisao3: boolean
}

export async function updateErro({ idProvaAluno, idQuestao, revisao1, revisao2, revisao3 }: UpdateErroProps) {
  return await prisma.cadernoErro.update({
    where: {
      idProvaAluno_idQuestao: {
        idProvaAluno,
        idQuestao,
      },
    },
    data: {
      revisao1,
      revisao2,
      revisao3
    },
  })

}