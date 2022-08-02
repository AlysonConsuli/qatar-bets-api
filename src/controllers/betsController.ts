import { Request, Response } from "express";

import { BetInsertData } from "../interfaces/createData.js";
import * as betsService from "../services/betsService.js";

export const addBet = async (req: Request, res: Response) => {
  const userId: number = res.locals.user.id;
  const betData: BetInsertData = req.body;
  await betsService.addBet({ userId, ...betData });
  res.sendStatus(201);
};

export const getBets = async (req: Request, res: Response) => {
  const bets = await betsService.getBets();
  res.send(bets);
};
