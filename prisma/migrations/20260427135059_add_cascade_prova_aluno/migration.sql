-- DropForeignKey
ALTER TABLE "prova_aluno" DROP CONSTRAINT "prova_aluno_id_aluno_fkey";

-- DropForeignKey
ALTER TABLE "prova_aluno" DROP CONSTRAINT "prova_aluno_id_prova_fkey";

-- AddForeignKey
ALTER TABLE "prova_aluno" ADD CONSTRAINT "prova_aluno_id_prova_fkey" FOREIGN KEY ("id_prova") REFERENCES "provas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prova_aluno" ADD CONSTRAINT "prova_aluno_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "alunos"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;
