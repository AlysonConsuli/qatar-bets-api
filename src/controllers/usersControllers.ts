import { Request, Response } from "express";

import { PaymentInsertData } from "../interfaces/createData.js";
import * as usersService from "../services/usersService.js";

export const postPayment = async (req: Request, res: Response) => {
  const user: PaymentInsertData = req.body;
  const admin: string = res.locals.user.name;
  await usersService.postPayment(user, admin);
  res.sendStatus(200);
};

export const getRanking = async (req: Request, res: Response) => {
  const ranking = await usersService.getRanking();
  res.send({ ranking });
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await usersService.getUsers();
  res.send({ users });
};
