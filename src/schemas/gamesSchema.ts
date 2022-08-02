import Joi from "joi";
import { GameInsertData } from "../interfaces/createData.js";

export const gameSchema = Joi.object<GameInsertData>({});
