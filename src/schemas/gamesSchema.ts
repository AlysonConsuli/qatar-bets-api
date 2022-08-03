import Joi from "joi";
import { ResultInsertData } from "../interfaces/createData.js";

export const resultSchema = Joi.object<ResultInsertData>({
  id: Joi.number().integer().min(1).required(),
  score1: Joi.number().integer().min(0).required(),
  score2: Joi.number().integer().min(0).required(),
});
