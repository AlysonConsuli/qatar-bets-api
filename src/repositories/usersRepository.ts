import prisma from "../config/db.js";

export const postPayment = async (userId: number, isPaid: boolean) => {
  await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      isPaid,
    },
  });
};

export const getRanking = async () => {
  return await prisma.bets.groupBy({
    by: ["userId"],
    _sum: { points: true },
    orderBy: [
      {
        _sum: {
          points: "desc",
        },
      },
      {
        userId: "asc",
      },
    ],
  });
};

export const getUsers = async () => {
  return await prisma.users.findMany({
    select: {
      id: true,
      name: true,
      isPaid: true,
    },
    orderBy: [
      {
        isPaid: "asc",
      },
      {
        name: "asc",
      },
    ],
  });
};
