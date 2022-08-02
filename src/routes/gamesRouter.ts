import { Router } from "express";

import { getGames } from "../controllers/gamesController.js";
import { validateToken } from "../middlewares/validateToken.js";

const gameRouter = Router();
gameRouter.use(validateToken);
gameRouter.get("/games", getGames);

export default gameRouter;
