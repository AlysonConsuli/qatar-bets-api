import prisma from "../config/db.js";

export const findBetByUserIdAndGameId = async (
  userId: number,
  gameId: number,
) => {
  return await prisma.bets.findFirst({
    where: {
      userId,
      gameId,
    },
  });
};

export const getBets = async () => {
  return await prisma.bets.findMany({
    select: {
      id: true,
      user: {
        select: {
          name: true,
          isPaid: true,
        },
      },
      game: {
        select: {
          team1: {
            select: {
              name: true,
            },
          },
          score1: true,
          team2: {
            select: {
              name: true,
            },
          },
          score2: true,
        },
      },
      score1: true,
      score2: true,
      points: true,
    },
  });
};

export const getUsersBets = async (userId: number) => {
  return await prisma.bets.findMany({
    select: {
      id: true,
      user: {
        select: {
          name: true,
          isPaid: true,
        },
      },
      game: {
        select: {
          team1: {
            select: {
              name: true,
            },
          },
          score1: true,
          team2: {
            select: {
              name: true,
            },
          },
          score2: true,
        },
      },
      score1: true,
      score2: true,
      points: true,
    },
    where: {
      userId,
    },
  });
};
