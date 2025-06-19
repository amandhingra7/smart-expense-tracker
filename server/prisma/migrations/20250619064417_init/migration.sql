/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Expense` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "createdAt";
