import prisma from "../../src/config/db.js";

export async function deleteAllData() {
  await prisma.$transaction([
    prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE teams RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE games RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE bets RESTART IDENTITY CASCADE`,
  ]);
}
