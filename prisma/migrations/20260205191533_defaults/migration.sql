/*
  Warnings:

  - Made the column `alunoDesde` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'ALUNO',
ALTER COLUMN "alunoDesde" SET NOT NULL,
ALTER COLUMN "alunoDesde" SET DEFAULT CURRENT_TIMESTAMP;
