import { Request, Response } from "express";

import { BetInsertData, GroupBy } from "../interfaces/createData.js";
import * as betsService from "../services/betsService.js";

export const addBet = async (req: Request, res: Response) => {
  const userId: number = res.locals.user.id;
  const betData: BetInsertData = req.body;
  await betsService.addBet({ userId, ...betData });
  res.sendStatus(201);
};

export const getBets = async (req: Request, res: Response) => {
  const groupBy = req.query.groupBy as GroupBy;
  const userId: number = res.locals.user.id;
  const bets = await betsService.getBets(groupBy, userId);
  res.send({ bets });
};
