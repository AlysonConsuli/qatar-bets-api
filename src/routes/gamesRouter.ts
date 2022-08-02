import { Router } from "express";

import { getGames } from "../controllers/gamesController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/validateToken.js";
import { gameSchema } from "../schemas/gamesSchema.js";

const gameRouter = Router();
gameRouter.use(validateToken);
gameRouter.get("/games", validateSchema(gameSchema), getGames);

export default gameRouter;
