-- AlterTable
ALTER TABLE "bets" ADD COLUMN     "points" INTEGER;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false;
