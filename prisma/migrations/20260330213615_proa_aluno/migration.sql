/*
  Warnings:

  - The primary key for the `respostas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_aluno` on the `respostas` table. All the data in the column will be lost.
  - You are about to drop the `Aluno` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `respostas_prova` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Aluno" DROP CONSTRAINT "Aluno_carreira_value_fkey";

-- DropForeignKey
ALTER TABLE "Aluno" DROP CONSTRAINT "Aluno_id_professor_fkey";

-- DropForeignKey
ALTER TABLE "Aluno" DROP CONSTRAINT "Aluno_id_user_fkey";

-- DropForeignKey
ALTER TABLE "respostas" DROP CONSTRAINT "respostas_id_aluno_fkey";

-- DropForeignKey
ALTER TABLE "respostas" DROP CONSTRAINT "respostas_id_prova_aluno_fkey";

-- DropForeignKey
ALTER TABLE "respostas_prova" DROP CONSTRAINT "respostas_prova_id_aluno_fkey";

-- DropForeignKey
ALTER TABLE "respostas_prova" DROP CONSTRAINT "respostas_prova_id_prova_fkey";

-- AlterTable
ALTER TABLE "respostas" DROP CONSTRAINT "respostas_pkey",
DROP COLUMN "id_aluno",
ADD CONSTRAINT "respostas_pkey" PRIMARY KEY ("id_prova_aluno", "id_questao");

-- DropTable
DROP TABLE "Aluno";

-- DropTable
DROP TABLE "respostas_prova";

-- CreateTable
CREATE TABLE "alunos" (
    "id_user" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3),
    "id_professor" TEXT NOT NULL,
    "aluno_desde" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "telefone" TEXT,
    "carreira_value" TEXT,

    CONSTRAINT "alunos_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "prova_aluno" (
    "id_prova_aluno" TEXT NOT NULL,
    "id_aluno" TEXT NOT NULL,
    "id_prova" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gcp" INTEGER NOT NULL,

    CONSTRAINT "prova_aluno_pkey" PRIMARY KEY ("id_prova_aluno")
);

-- CreateIndex
CREATE UNIQUE INDEX "prova_aluno_id_aluno_id_prova_key" ON "prova_aluno"("id_aluno", "id_prova");

-- AddForeignKey
ALTER TABLE "alunos" ADD CONSTRAINT "alunos_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alunos" ADD CONSTRAINT "alunos_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "professores"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alunos" ADD CONSTRAINT "alunos_carreira_value_fkey" FOREIGN KEY ("carreira_value") REFERENCES "@carreiras"("value") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prova_aluno" ADD CONSTRAINT "prova_aluno_id_prova_fkey" FOREIGN KEY ("id_prova") REFERENCES "provas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prova_aluno" ADD CONSTRAINT "prova_aluno_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "alunos"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respostas" ADD CONSTRAINT "respostas_id_prova_aluno_fkey" FOREIGN KEY ("id_prova_aluno") REFERENCES "prova_aluno"("id_prova_aluno") ON DELETE RESTRICT ON UPDATE CASCADE;
