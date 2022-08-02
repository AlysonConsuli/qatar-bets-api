import prisma from "../config/db.js";

export const getGames = async () => {
  return await prisma.games.findMany({
    select: {
      id: true,
      team1: {
        select: { name: true },
      },
      score1: true,
      team2: {
        select: {
          name: true,
        },
      },
      score2: true,
    },
  });
};
