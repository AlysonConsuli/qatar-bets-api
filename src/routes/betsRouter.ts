import { Router } from "express";

import { betsController } from "../controllers/betsController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/validateToken.js";
import { betSchema } from "../schemas/betsSchema.js";

const betRouter = Router();
betRouter.use(validateToken);
betRouter.post("/bet", validateSchema(betSchema), betsController.addBet);
betRouter.get("/bets", betsController.getBets);
betRouter.get("/bets/user/:userId", betsController.getBetsByUser);
betRouter.get("/bets/game/:gameId", betsController.getBetsByGame);

export default betRouter;
