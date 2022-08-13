import { Request, Response } from "express";

import { deleteAllData } from "../../tests/factories/scenarioFactory.js";

export const deleteAll = async (req: Request, res: Response) => {
  await deleteAllData();
  res.sendStatus(200);
};
