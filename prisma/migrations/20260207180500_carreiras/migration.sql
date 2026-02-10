/*
  Warnings:

  - You are about to drop the column `alunoDesde` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `carreira` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `dataNascimento` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `idProfessor` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `users` table. All the data in the column will be lost.
  - Added the required column `password_hash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_idProfessor_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "alunoDesde",
DROP COLUMN "avatarUrl",
DROP COLUMN "carreira",
DROP COLUMN "dataNascimento",
DROP COLUMN "idProfessor",
DROP COLUMN "passwordHash",
ADD COLUMN     "aluno_desde" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "carreira_value" TEXT,
ADD COLUMN     "data_nascimento" TIMESTAMP(3),
ADD COLUMN     "id_professor" TEXT,
ADD COLUMN     "password_hash" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_professor_fkey" FOREIGN KEY ("id_professor") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_carreira_value_fkey" FOREIGN KEY ("carreira_value") REFERENCES "@carreiras"("carreira_value") ON DELETE SET NULL ON UPDATE CASCADE;
