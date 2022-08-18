import { Request, Response } from "express";

import { authService } from "../services/authService.js";
import { UserInsertData } from "../interfaces/createData.js";
import { formats } from "../utils/formatName.js";

const signup = async (req: Request, res: Response) => {
  const user: UserInsertData = req.body;
  await authService.signup({ name: user.name, password: user.password });
  res.sendStatus(201);
};

const signin = async (req: Request, res: Response) => {
  const user: UserInsertData = req.body;
  const token = await authService.signin(user);
  const name = formats.formatName(user.name);
  res.send({ name, token });
};

const autologin = async (req: Request, res: Response) => {
  res.sendStatus(200);
};

const adminlogin = async (req: Request, res: Response) => {
  const userName: string = res.locals.user.name;
  await authService.adminlogin(userName);
  res.sendStatus(200);
};

export const authController = {
  signup,
  signin,
  autologin,
  adminlogin,
};
