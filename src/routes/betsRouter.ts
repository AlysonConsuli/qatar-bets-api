import { Router } from "express";

import { addBet, getBets } from "../controllers/betsController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/validateToken.js";
import { betSchema } from "../schemas/betsSchema.js";

const betRouter = Router();
betRouter.use(validateToken);
betRouter.post("/bet", validateSchema(betSchema), addBet);
betRouter.get("/bets", getBets);

export default betRouter;
