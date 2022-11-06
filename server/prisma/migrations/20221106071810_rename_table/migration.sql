/*
  Warnings:

  - You are about to drop the `Gess` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Gess`;

-- CreateTable
CREATE TABLE `Guess` (
    `id` VARCHAR(191) NOT NULL,
    `firstTeamPoints` INTEGER NOT NULL,
    `secondTeamPoints` INTEGER NOT NULL,
    `participantsId` VARCHAR(191) NOT NULL,
    `gameId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Guess_participantsId_gameId_key`(`participantsId`, `gameId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
