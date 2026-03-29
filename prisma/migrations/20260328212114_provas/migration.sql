/*
  Warnings:

  - Added the required column `nota_maxima` to the `provas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nota_minima` to the `provas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peso_1` to the `provas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peso_2` to the `provas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peso_3` to the `provas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peso_4` to the `provas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "provas" ADD COLUMN     "nota_maxima" INTEGER NOT NULL,
ADD COLUMN     "nota_minima" INTEGER NOT NULL,
ADD COLUMN     "peso_1" INTEGER NOT NULL,
ADD COLUMN     "peso_2" INTEGER NOT NULL,
ADD COLUMN     "peso_3" INTEGER NOT NULL,
ADD COLUMN     "peso_4" INTEGER NOT NULL,
ADD COLUMN     "status_prova" BOOLEAN NOT NULL DEFAULT false;
