import { Request, Response } from "express";

import * as gamesService from "../services/gamesService.js";

export const getGames = async (req: Request, res: Response) => {
  res.sendStatus(200);
};
