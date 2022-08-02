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
