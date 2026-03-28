-- CreateTable
CREATE TABLE "respostas" (
    "id_aluno" TEXT NOT NULL,
    "id_questao" TEXT NOT NULL,
    "resposta" TEXT NOT NULL,
    "resultado" BOOLEAN NOT NULL,

    CONSTRAINT "respostas_pkey" PRIMARY KEY ("id_aluno","id_questao")
);

-- AddForeignKey
ALTER TABLE "respostas" ADD CONSTRAINT "respostas_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respostas" ADD CONSTRAINT "respostas_id_questao_fkey" FOREIGN KEY ("id_questao") REFERENCES "questoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
