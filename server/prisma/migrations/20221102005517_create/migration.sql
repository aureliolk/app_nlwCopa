/*
  Warnings:

  - Added the required column `poolId` to the `Participants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Participants` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "firstTeamCountryCode" TEXT NOT NULL,
    "secondTeamCountryCode" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Gess" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firsTeamPoints" INTEGER NOT NULL,
    "secondTeamPoints" INTEGER NOT NULL,
    "participantsId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Gess_participantsId_fkey" FOREIGN KEY ("participantsId") REFERENCES "Participants" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Gess_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Participants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "poolId" TEXT NOT NULL,
    CONSTRAINT "Participants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Participants_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "Pool" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Participants" ("id") SELECT "id" FROM "Participants";
DROP TABLE "Participants";
ALTER TABLE "new_Participants" RENAME TO "Participants";
CREATE UNIQUE INDEX "Participants_userId_poolId_key" ON "Participants"("userId", "poolId");
CREATE TABLE "new_Pool" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "ownerId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL,
    CONSTRAINT "Pool_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Pool" ("code", "createdAt", "id", "title", "updateAt") SELECT "code", "createdAt", "id", "title", "updateAt" FROM "Pool";
DROP TABLE "Pool";
ALTER TABLE "new_Pool" RENAME TO "Pool";
CREATE UNIQUE INDEX "Pool_code_key" ON "Pool"("code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
