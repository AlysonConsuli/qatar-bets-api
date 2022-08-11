import prisma from "../config/db.js";

const findUserByName = async (name: string) => {
  const user = await prisma.users.findFirst({
    where: {
      name,
    },
  });
  return user;
};

export const authRepository = {
  findUserByName,
};
