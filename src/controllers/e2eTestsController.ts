import { Request, Response } from "express";

import { deleteAllData } from "../../tests/factories/scenarioFactory.js";
import { e2eTestsService } from "../services/e2eTestsService.js";

export const deleteAll = async (req: Request, res: Response) => {
  await deleteAllData();
  res.sendStatus(200);
};

export const createGame = async (req: Request, res: Response) => {
  await e2eTestsService.createGame();
  res.sendStatus(200);
};
