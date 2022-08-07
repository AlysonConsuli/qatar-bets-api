import { Request, Response } from "express";

import { BetInsertData, GroupBy } from "../interfaces/createData.js";
import * as betsService from "../services/betsService.js";

export const addBet = async (req: Request, res: Response) => {
  const userId: number = res.locals.user.id;
  const isPaid: boolean = res.locals.user.isPaid;
  const betData: BetInsertData = req.body;
  await betsService.addBet({ userId, ...betData }, isPaid);
  res.sendStatus(201);
};

export const getBets = async (req: Request, res: Response) => {
  const groupBy = req.query.groupBy as GroupBy;
  const userId: number = res.locals.user.id;
  const bets = await betsService.getBets(groupBy, userId);
  res.send({ bets });
};

export const getBetsByUser = async (req: Request, res: Response) => {
  const userId: number = +req.params.userId;
  const bets = await betsService.getBetsByUser(userId);
  res.send({ bets });
};

export const getBetsByGame = async (req: Request, res: Response) => {
  const gameId: number = +req.params.gameId;
  const bets = await betsService.getBetsByGame(gameId);
  res.send({ bets });
};
