/*
  Warnings:

  - The primary key for the `@carreiras` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `carreira_label` on the `@carreiras` table. All the data in the column will be lost.
  - You are about to drop the column `carreira_value` on the `@carreiras` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[label]` on the table `@carreiras` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `label` to the `@carreiras` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `@carreiras` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_carreira_value_fkey";

-- DropIndex
DROP INDEX "@carreiras_carreira_label_key";

-- AlterTable
ALTER TABLE "@carreiras" DROP CONSTRAINT "@carreiras_pkey",
DROP COLUMN "carreira_label",
DROP COLUMN "carreira_value",
ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL,
ADD CONSTRAINT "@carreiras_pkey" PRIMARY KEY ("value");

-- CreateTable
CREATE TABLE "provas" (
    "id" TEXT NOT NULL,
    "ano" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_professor" TEXT NOT NULL,

    CONSTRAINT "provas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questoes" (
    "id" TEXT NOT NULL,
    "dificuldade" INTEGER NOT NULL,
    "resposta" TEXT NOT NULL,
    "habilidade_value" INTEGER NOT NULL,
    "assunto_value" TEXT NOT NULL,
    "prova_id" TEXT,

    CONSTRAINT "questoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "@habilidades" (
    "value" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "@habilidades_pkey" PRIMARY KEY ("value")
);

-- CreateTable
CREATE TABLE "@assuntos" (
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "@assuntos_pkey" PRIMARY KEY ("value")
);

-- CreateIndex
CREATE UNIQUE INDEX "@carreiras_label_key" ON "@carreiras"("label");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_carreira_value_fkey" FOREIGN KEY ("carreira_value") REFERENCES "@carreiras"("value") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provas" ADD CONSTRAINT "provas_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questoes" ADD CONSTRAINT "questoes_prova_id_fkey" FOREIGN KEY ("prova_id") REFERENCES "provas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questoes" ADD CONSTRAINT "questoes_habilidade_value_fkey" FOREIGN KEY ("habilidade_value") REFERENCES "@habilidades"("value") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questoes" ADD CONSTRAINT "questoes_assunto_value_fkey" FOREIGN KEY ("assunto_value") REFERENCES "@assuntos"("value") ON DELETE RESTRICT ON UPDATE CASCADE;
