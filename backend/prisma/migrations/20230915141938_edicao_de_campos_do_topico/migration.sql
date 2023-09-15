/*
  Warnings:

  - Added the required column `titulo` to the `Topico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Topico" ADD COLUMN     "titulo" TEXT NOT NULL;
