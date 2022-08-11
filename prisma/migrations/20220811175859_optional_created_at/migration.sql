-- AlterTable
ALTER TABLE "bets" ALTER COLUMN "createdAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "games" ALTER COLUMN "createdAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "teams" ALTER COLUMN "createdAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "createdAt" DROP NOT NULL;
