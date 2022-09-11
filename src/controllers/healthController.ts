import { Request, Response } from "express";

export const appHealth = (req: Request, res: Response) => {
  res.sendStatus(200);
};
