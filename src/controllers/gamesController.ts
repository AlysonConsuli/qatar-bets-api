import { Request, Response } from "express";

import { ResultInsertData } from "../interfaces/createData.js";
import * as gamesService from "../services/gamesService.js";

export const getGames = async (req: Request, res: Response) => {
  const games = await gamesService.getGames();
  res.send({ games });
};

export const postResult = async (req: Request, res: Response) => {
  const userName: string = res.locals.user.name;
  const result: ResultInsertData = req.body;
  await gamesService.postResult(result, userName);
  res.sendStatus(201);
};
