/*
  Warnings:

  - You are about to drop the column `id_professor` on the `provas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "provas" DROP CONSTRAINT "provas_id_professor_fkey";

-- AlterTable
ALTER TABLE "provas" DROP COLUMN "id_professor";
