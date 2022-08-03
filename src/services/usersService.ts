import { unauthorizedError } from "../middlewares/errorHandlingMiddleware.js";
import { PaymentInsertData } from "../interfaces/createData.js";
import { validateHasData } from "../utils/validateData.js";
import * as usersRepository from "../repositories/usersRepository.js";

export const postPayment = async (user: PaymentInsertData, admin: string) => {
  const { id: userId, isPaid } = user;
  if (admin !== "admin") {
    throw unauthorizedError("Only accessed by admin");
  }
  await validateHasData(userId, "users", "User");
  await usersRepository.postPayment(userId, isPaid);
};
