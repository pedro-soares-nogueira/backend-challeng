/*
  Warnings:

  - You are about to alter the column `governmentId` on the `documents` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "documents" ALTER COLUMN "governmentId" SET DATA TYPE INTEGER;
