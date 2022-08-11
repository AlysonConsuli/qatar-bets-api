import prisma from "../config/db.js";

const postPayment = async (userId: number, isPaid: boolean) => {
  await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      isPaid,
    },
  });
};

const getRanking = async () => {
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

const getUsers = async () => {
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

export const usersRepository = {
  postPayment,
  getRanking,
  getUsers,
};
