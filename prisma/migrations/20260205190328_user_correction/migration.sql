/*
  Warnings:

  - You are about to drop the column `aluno_desde` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email_verified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "aluno_desde",
DROP COLUMN "email_verified",
DROP COLUMN "image",
DROP COLUMN "password_hash",
ADD COLUMN     "alunoDesde" TIMESTAMP(3),
ADD COLUMN     "professorId" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "role" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "users_slug_key" ON "users"("slug");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
