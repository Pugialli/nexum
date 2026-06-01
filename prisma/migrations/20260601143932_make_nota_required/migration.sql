/*
  Warnings:

  - Made the column `nota` on table `prova_aluno` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "prova_aluno" ALTER COLUMN "nota" SET NOT NULL;
