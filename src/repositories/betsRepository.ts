import prisma from "../config/db.js";
import { BetInsertData } from "../interfaces/createData.js";

export const upsertBet = async (data: BetInsertData, betId: number) => {
  await prisma.bets.upsert({
    where: {
      id: betId,
    },
    update: {
      score1: data.score1,
      score2: data.score2,
    },
    create: {
      ...data,
    },
  });
};

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
      },
      score1: true,
      score2: true,
      points: true,
    },
    orderBy: { gameId: "asc" },
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
      },
      score1: true,
      score2: true,
      points: true,
    },
    where: {
      userId,
    },
    orderBy: { gameId: "asc" },
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
      },
      score1: true,
      score2: true,
      points: true,
    },
    where: {
      gameId,
    },
    orderBy: { gameId: "asc" },
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
