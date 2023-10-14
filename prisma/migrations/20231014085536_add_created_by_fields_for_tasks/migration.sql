/*
  Warnings:

  - You are about to drop the `PeriodicTasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PeriodicTasksToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdById` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_PeriodicTasksToUser_B_index";

-- DropIndex
DROP INDEX "_PeriodicTasksToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PeriodicTasks";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_PeriodicTasksToUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PeriodicTask" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "repeats" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    CONSTRAINT "PeriodicTask_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PeriodicTask_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_PeriodicTaskToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PeriodicTaskToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "PeriodicTask" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PeriodicTaskToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "expires" DATETIME NOT NULL,
    "periodically" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "seenByUser" BOOLEAN NOT NULL DEFAULT false,
    "groupId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    CONSTRAINT "Task_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Task_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("completed", "createdAt", "description", "expires", "groupId", "id", "name", "periodically", "seenByUser", "updatedAt", "userId") SELECT "completed", "createdAt", "description", "expires", "groupId", "id", "name", "periodically", "seenByUser", "updatedAt", "userId" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_PeriodicTaskToUser_AB_unique" ON "_PeriodicTaskToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PeriodicTaskToUser_B_index" ON "_PeriodicTaskToUser"("B");
