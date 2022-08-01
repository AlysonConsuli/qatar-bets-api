/*
  Warnings:

  - You are about to drop the `results` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "results" DROP CONSTRAINT "results_gameId_fkey";

-- AlterTable
ALTER TABLE "games" ADD COLUMN     "score1" INTEGER,
ADD COLUMN     "score2" INTEGER;

-- DropTable
DROP TABLE "results";
