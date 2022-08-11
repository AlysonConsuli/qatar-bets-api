import { Request, Response } from "express";

import { PaymentInsertData } from "../interfaces/createData.js";
import { usersService } from "../services/usersService.js";

const postPayment = async (req: Request, res: Response) => {
  const user: PaymentInsertData = req.body;
  const admin: string = res.locals.user.name;
  await usersService.postPayment(user, admin);
  res.sendStatus(200);
};

const getRanking = async (req: Request, res: Response) => {
  const ranking = await usersService.getRanking();
  res.send({ ranking });
};

const getUsers = async (req: Request, res: Response) => {
  const users = await usersService.getUsers();
  res.send({ users });
};

export const usersControllers = {
  postPayment,
  getRanking,
  getUsers,
};
