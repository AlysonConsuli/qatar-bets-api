import { Request, Response } from "express";

import { BetInsertData, GroupBy } from "../interfaces/createData.js";
import { betsService } from "../services/betsService.js";

const addBet = async (req: Request, res: Response) => {
  const userId: number = res.locals.user.id;
  const betData: BetInsertData = req.body;
  await betsService.addBet({ userId, ...betData });
  res.sendStatus(201);
};

const getBets = async (req: Request, res: Response) => {
  const groupBy = req.query.groupBy as GroupBy;
  const userId: number = res.locals.user.id;
  const bets = await betsService.getBets(groupBy, userId);
  res.send({ bets });
};

const getBetsByUser = async (req: Request, res: Response) => {
  const userId: number = +req.params.userId;
  const bets = await betsService.getBetsByUser(userId);
  res.send({ bets });
};

const getBetsByGame = async (req: Request, res: Response) => {
  const gameId: number = +req.params.gameId;
  const bets = await betsService.getBetsByGame(gameId);
  res.send({ bets });
};

export const betsController = {
  addBet,
  getBets,
  getBetsByUser,
  getBetsByGame,
};
