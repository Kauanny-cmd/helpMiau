/*
  Warnings:

  - You are about to drop the column `comentarios` on the `Topico` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Topico" DROP COLUMN "comentarios";

-- CreateTable
CREATE TABLE "ComentarioPost" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "ComentarioPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComentarioTopico" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "topicoId" TEXT NOT NULL,

    CONSTRAINT "ComentarioTopico_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ComentarioPost" ADD CONSTRAINT "ComentarioPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComentarioPost" ADD CONSTRAINT "ComentarioPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComentarioTopico" ADD CONSTRAINT "ComentarioTopico_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComentarioTopico" ADD CONSTRAINT "ComentarioTopico_topicoId_fkey" FOREIGN KEY ("topicoId") REFERENCES "Topico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
