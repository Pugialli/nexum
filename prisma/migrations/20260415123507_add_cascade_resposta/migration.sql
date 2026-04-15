-- DropForeignKey
ALTER TABLE "respostas" DROP CONSTRAINT "respostas_id_prova_aluno_fkey";

-- AddForeignKey
ALTER TABLE "respostas" ADD CONSTRAINT "respostas_id_prova_aluno_fkey" FOREIGN KEY ("id_prova_aluno") REFERENCES "prova_aluno"("id_prova_aluno") ON DELETE CASCADE ON UPDATE CASCADE;
