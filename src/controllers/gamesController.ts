import { Request, Response } from "express";

import * as gamesService from "../services/gamesService.js";

export const getGames = async (req: Request, res: Response) => {
  const games = await gamesService.getGames();
  res.send({ games });
};
