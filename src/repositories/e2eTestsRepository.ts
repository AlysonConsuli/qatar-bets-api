import prisma from "../config/db.js";

const createGame = async (teams: any, games: any) => {
  await prisma.teams.createMany({ data: teams, skipDuplicates: true });
  await prisma.games.createMany({
    data: games,
    skipDuplicates: true,
  });
};

export const e2eTestsRepository = {
  createGame,
};
