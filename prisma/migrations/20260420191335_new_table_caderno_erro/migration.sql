-- CreateTable
CREATE TABLE "caderno_erros" (
    "id_prova_aluno" TEXT NOT NULL,
    "id_questao" TEXT NOT NULL,
    "revisao_1" BOOLEAN NOT NULL DEFAULT false,
    "revisao_2" BOOLEAN NOT NULL DEFAULT false,
    "revisao_3" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "caderno_erros_pkey" PRIMARY KEY ("id_prova_aluno","id_questao")
);

-- AddForeignKey
ALTER TABLE "caderno_erros" ADD CONSTRAINT "caderno_erros_id_prova_aluno_id_questao_fkey" FOREIGN KEY ("id_prova_aluno", "id_questao") REFERENCES "respostas"("id_prova_aluno", "id_questao") ON DELETE CASCADE ON UPDATE CASCADE;
