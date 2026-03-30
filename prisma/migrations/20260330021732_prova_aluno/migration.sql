/*
  Warnings:

  - You are about to drop the column `aluno_desde` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `carreira_value` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `data_nascimento` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `id_professor` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `users` table. All the data in the column will be lost.
  - Added the required column `id_prova_aluno` to the `respostas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "respostas" DROP CONSTRAINT "respostas_id_aluno_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_carreira_value_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_id_professor_fkey";

-- AlterTable
ALTER TABLE "respostas" ADD COLUMN     "id_prova_aluno" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "aluno_desde",
DROP COLUMN "carreira_value",
DROP COLUMN "data_nascimento",
DROP COLUMN "id_professor",
DROP COLUMN "telefone";

-- CreateTable
CREATE TABLE "Aluno" (
    "id_user" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3),
    "id_professor" TEXT NOT NULL,
    "aluno_desde" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "telefone" TEXT,
    "carreira_value" TEXT,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "professores" (
    "id_user" TEXT NOT NULL,
    "formacao" TEXT,
    "telefone" TEXT,

    CONSTRAINT "professores_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "respostas_prova" (
    "id_prova_aluno" TEXT NOT NULL,
    "id_aluno" TEXT NOT NULL,
    "id_prova" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gcp" INTEGER NOT NULL,

    CONSTRAINT "respostas_prova_pkey" PRIMARY KEY ("id_prova_aluno")
);

-- CreateIndex
CREATE UNIQUE INDEX "respostas_prova_id_aluno_id_prova_key" ON "respostas_prova"("id_aluno", "id_prova");

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "professores"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_carreira_value_fkey" FOREIGN KEY ("carreira_value") REFERENCES "@carreiras"("value") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professores" ADD CONSTRAINT "professores_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respostas_prova" ADD CONSTRAINT "respostas_prova_id_prova_fkey" FOREIGN KEY ("id_prova") REFERENCES "provas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respostas_prova" ADD CONSTRAINT "respostas_prova_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "Aluno"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respostas" ADD CONSTRAINT "respostas_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "Aluno"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respostas" ADD CONSTRAINT "respostas_id_prova_aluno_fkey" FOREIGN KEY ("id_prova_aluno") REFERENCES "respostas_prova"("id_prova_aluno") ON DELETE RESTRICT ON UPDATE CASCADE;
