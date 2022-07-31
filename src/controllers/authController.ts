import { Request, Response } from "express";

import * as authService from "../services/authService.js";
import { UserInsertData } from "../interfaces/createData.js";

export const signup = async (req: Request, res: Response) => {
  // const user: UserInsertData = req.body;
  // await authService.signup({ name: user.name, password: user.password });
  res.sendStatus(201);
};

export const signin = async (req: Request, res: Response) => {
  // const user: UserInsertData = req.body;
  // const token = await authService.signin(user);
  // res.send({ token });
  res.sendStatus(200);
};
