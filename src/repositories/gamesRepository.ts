import prisma from "../config/db.js";

export const getGames = async () => {
  return await prisma.games.findMany({
    select: {
      id: true,
      team1: {
        select: {
          name: true,
        },
      },
      team2: {
        select: {
          name: true,
        },
      },
      score1: true,
      score2: true,
    },
    orderBy: { id: "asc" },
  });
};

export const findResultById = async (gameId: number) => {
  return await prisma.games.findFirst({
    where: {
      id: gameId,
    },
  });
};

export const postResult = async (
  gameId: number,
  score1: number,
  score2: number,
) => {
  await prisma.games.update({
    where: {
      id: gameId,
    },
    data: {
      score1,
      score2,
    },
  });
};
