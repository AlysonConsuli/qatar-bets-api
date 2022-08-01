import Joi from "joi";
import { BetInsertData } from "../interfaces/createData.js";

export const betSchema = Joi.object<BetInsertData>({
  gameId: Joi.number().integer().min(1).required(),
  score1: Joi.number().integer().min(0).required(),
  score2: Joi.number().integer().min(0).required(),
});
