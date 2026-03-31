import type { PrismaClient } from "@/generated"
// ─────────────────────────────────────────────
// DADOS DE MOCK — comente a chamada no seed.ts quando quiser ignorar
export async function seedDadosMock(prisma: PrismaClient, alunoId: string) {
  const provasMock = [
    { id: 'prova-2030-1', ano: '2030.1' },
    { id: 'prova-2030-2', ano: '2030.2' },
    { id: 'prova-2030-3', ano: '2030.3' },
    { id: 'prova-2030-4', ano: '2030.4' },
    { id: 'prova-2030-5', ano: '2030.5' },
    { id: 'prova-2030-6', ano: '2030.6' },
    { id: 'prova-2030-7', ano: '2030.7' },
    { id: 'prova-2030-8', ano: '2030.8' },
    { id: 'prova-2030-9', ano: '2030.9' },
  ]

  const progressao = [
    { score: 32, gcp: 58 },
    { score: 28, gcp: 62 },
    { score: 41, gcp: 65 },
    { score: 35, gcp: 70 },
    { score: 42, gcp: 68 },
    { score: 30, gcp: 72 },
    { score: 37, gcp: 75 },
    { score: 29, gcp: 80 },
    { score: 38, gcp: 85 },
  ]

  const dataBase = new Date('2026-01-12')
  const habilidades = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
  const assuntos = ['AC-01','AC-02','GE-01','GE-02','GE-03','GE-04','GE-05','AL-01','AL-02','FN-01','FN-02','FN-03','FN-04','FN-05','FN-06','ES-01','ES-02','MA-01','MA-02','MA-03','MA-04','MA-05','MA-06']
  const gabaritoOpcoes = ['A','B','C','D','E']

  for (let i = 0; i < provasMock.length; i++) {
    const provaDef = provasMock[i]
    const prog = progressao[i]

    // Pula se já existe ProvaAluno para essa prova
    const jaExiste = await prisma.provaAluno.findFirst({
      where: { idAluno: alunoId, idProva: provaDef.id },
    })
    if (jaExiste) {
      console.log(`Prova mock já existe, pulando: ${provaDef.ano}`)
      continue
    }

    // Upsert prova
    const prova = await prisma.prova.upsert({
      where: { id: provaDef.id },
      update: {},
      create: {
        id: provaDef.id,
        ano: provaDef.ano,
        notaMinima: 150,
        notaMaxima: 300,
        peso1: 1,
        peso2: 2,
        peso3: 3,
        peso4: 4,
      },
    })

    // Cria 45 questões de uma vez
    await prisma.questao.createMany({
      data: Array.from({ length: 45 }, (_, q) => ({
        numero: 136 + q,
        gabarito: gabaritoOpcoes[q % 5],
        dificuldade: (q % 5) + 1,
        habilidadeValue: habilidades[q % habilidades.length],
        assuntoValue: assuntos[q % assuntos.length],
        idProva: prova.id,
      })),
    })

    // Busca as questões criadas
    const questoes = await prisma.questao.findMany({
      where: { idProva: prova.id },
      orderBy: { numero: 'asc' },
    })

    // Data da prova
    const dataProva = new Date(dataBase)
    dataProva.setDate(dataBase.getDate() + i * 7)

    // Cria ProvaAluno
    const provaAluno = await prisma.provaAluno.create({
      data: {
        idAluno: alunoId,
        idProva: prova.id,
        gcp: prog.gcp,
        createdAt: dataProva,
      },
    })

    // Cria 45 respostas de uma vez
    await prisma.resposta.createMany({
      data: questoes.map((questao, q) => {
        const acertou = q < prog.score
        const respostaAluno = acertou
          ? questao.gabarito
          : gabaritoOpcoes.find((g) => g !== questao.gabarito) ?? 'A'
        return {
          idQuestao: questao.id,
          idProvaAluno: provaAluno.id,
          resposta: respostaAluno,
          resultado: acertou,
        }
      }),
    })

    console.log(`Prova mock: ${prova.ano} | Acertos: ${prog.score} | GCP: ${prog.gcp} | Data: ${dataProva.toLocaleDateString('pt-BR')}`)
  }
}