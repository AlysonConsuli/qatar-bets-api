import { unauthorizedError } from "../middlewares/errorHandlingMiddleware.js";
import { PaymentInsertData } from "../interfaces/createData.js";
import { validateHasData } from "../utils/validateData.js";
import { usersRepository } from "../repositories/usersRepository.js";

const postPayment = async (user: PaymentInsertData, admin: string) => {
  const { id: userId, isPaid } = user;
  if (admin !== "admin") {
    throw unauthorizedError("Only accessed by admin");
  }
  await validateHasData(userId, "users", "User");
  await usersRepository.postPayment(userId, isPaid);
};

const getRanking = async () => {
  const users = await usersRepository.getUsers();
  const points = await usersRepository.getRanking();
  const ranking = points.map((userPoints) => {
    const user = users.find((user) => user.id === userPoints.userId);
    return { ...user, points: userPoints._sum.points };
  });
  return ranking;
};

const getUsers = async () => {
  const users = await usersRepository.getUsers();
  return users;
};

export const usersService = {
  postPayment,
  getRanking,
  getUsers,
};
