import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "../config/setup.js";

import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../middlewares/errorHandlingMiddleware.js";
import * as appRepository from "../repositories/appRepository.js";
import * as authRepository from "../repositories/authRepository.js";
import { UserInsertData } from "../interfaces/createData.js";

export const signup = async (userData: UserInsertData) => {
  const SALT = 10;
  const { name, password } = userData;
  const user = await authRepository.findUserByName(name);
  if (user) {
    throw conflictError("User already exists!");
  }
  const hashedPassword: string = bcrypt.hashSync(password, SALT);
  await appRepository.insertData(
    { ...userData, password: hashedPassword },
    "users",
  );
};

export const signin = async (userData: UserInsertData) => {};
