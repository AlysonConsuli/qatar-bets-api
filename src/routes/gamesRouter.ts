import { Router } from "express";

import { gamesController } from "../controllers/gamesController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/validateToken.js";
import { resultSchema } from "../schemas/gamesSchema.js";

const gameRouter = Router();
gameRouter.use(validateToken);
gameRouter.get("/games", gamesController.getGames);
gameRouter.post(
  "/game/result",
  validateSchema(resultSchema),
  gamesController.postResult,
);

export default gameRouter;
