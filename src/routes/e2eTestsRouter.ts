import { Router } from "express";

import { createGame, deleteAll } from "../controllers/e2eTestsController.js";

const e2eRouter = Router();
e2eRouter.post("/reset", deleteAll);
e2eRouter.post("/create-game", createGame);

export default e2eRouter;
