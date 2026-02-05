/*
  Warnings:

  - You are about to drop the column `professorId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_professorId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "professorId",
ADD COLUMN     "idProfessor" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_idProfessor_fkey" FOREIGN KEY ("idProfessor") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
