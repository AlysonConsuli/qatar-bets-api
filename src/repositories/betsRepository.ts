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
          id: true,
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
          team2: {
            select: {
              name: true,
            },
          },
          score1: true,
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
          id: true,
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
          team2: {
            select: {
              name: true,
            },
          },
          score1: true,
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

export const getBetsByGame = async (gameId: number) => {
  return await prisma.bets.findMany({
    select: {
      id: true,
      user: {
        select: {
          id: true,
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
          team2: {
            select: {
              name: true,
            },
          },
          score1: true,
          score2: true,
        },
      },
      score1: true,
      score2: true,
      points: true,
    },
    where: {
      gameId,
    },
  });
};

export const postPoints = async (
  gameId: number,
  userId: number,
  points: number,
) => {
  await prisma.bets.updateMany({
    where: {
      gameId,
      userId,
    },
    data: {
      points,
    },
  });
};
