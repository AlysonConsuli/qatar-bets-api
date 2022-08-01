import prisma from "../config/db.js";

export const findUserByName = async (name: string) => {
  const user = await prisma.users.findFirst({
    where: {
      name,
    },
  });
  return user;
};
