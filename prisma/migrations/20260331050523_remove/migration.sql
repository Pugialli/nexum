/*
  Warnings:

  - You are about to drop the column `aluno_desde` on the `alunos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "alunos" DROP CONSTRAINT "alunos_id_user_fkey";

-- DropForeignKey
ALTER TABLE "professores" DROP CONSTRAINT "professores_id_user_fkey";

-- AlterTable
ALTER TABLE "alunos" DROP COLUMN "aluno_desde";

-- AddForeignKey
ALTER TABLE "alunos" ADD CONSTRAINT "alunos_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professores" ADD CONSTRAINT "professores_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
