/*
  Warnings:

  - You are about to drop the column `avatarImg` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatarImg",
ADD COLUMN     "avatarUrl" TEXT;
