/*
  Warnings:

  - You are about to drop the column `prova_id` on the `questoes` table. All the data in the column will be lost.
  - You are about to drop the column `resposta` on the `questoes` table. All the data in the column will be lost.
  - Added the required column `gabarito` to the `questoes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `questoes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "questoes" DROP CONSTRAINT "questoes_prova_id_fkey";

-- AlterTable
ALTER TABLE "questoes" DROP COLUMN "prova_id",
DROP COLUMN "resposta",
ADD COLUMN     "gabarito" TEXT NOT NULL,
ADD COLUMN     "id_prova" TEXT,
ADD COLUMN     "numero" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "questoes" ADD CONSTRAINT "questoes_id_prova_fkey" FOREIGN KEY ("id_prova") REFERENCES "provas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
