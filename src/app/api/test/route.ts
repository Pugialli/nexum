import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const aluno = await prisma.aluno.findFirst({
    where: { user: { email: "aluno_dev@nexum.com.br" } },
    include: {
      provaAlunos: {
        include: {
          respostas: {
            where: { resultado: false },
          },
        },
      },
    },
  })

  if (!aluno) {
    return NextResponse.json({ error: "Aluno não encontrado" }, { status: 404 })
  }

  const respostasErradas = aluno.provaAlunos.flatMap((pa) =>
    pa.respostas.map((r) => ({
      idProvaAluno: r.idProvaAluno,
      idQuestao: r.idQuestao,
    }))
  )

  const criados = await prisma.cadernoErro.createMany({
    data: respostasErradas,
    skipDuplicates: true,
  })

  return NextResponse.json({
    message: `${criados.count} erros adicionados ao caderno`,
    total: respostasErradas.length,
  })
}