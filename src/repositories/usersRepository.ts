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
