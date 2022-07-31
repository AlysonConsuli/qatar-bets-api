import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "../config/setup.js";

import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../middlewares/errorHandlingMiddleware.js";
import * as appRepository from "../repositories/appRepository.js";
import { UserInsertData } from "../interfaces/createData.js";

export const signup = async (userData: UserInsertData) => {};

export const signin = async (userData: UserInsertData) => {};
