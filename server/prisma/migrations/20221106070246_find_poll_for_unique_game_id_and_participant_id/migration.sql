/*
  Warnings:

  - A unique constraint covering the columns `[participantsId,gameId]` on the table `Gess` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Gess_participantsId_gameId_key` ON `Gess`(`participantsId`, `gameId`);
