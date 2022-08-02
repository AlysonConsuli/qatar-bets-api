import { Router } from "express";

import authRouter from "./authRouter.js";
import betRouter from "./betsRouter.js";
import gameRouter from "./gamesRouter.js";

const router = Router();
router.use(authRouter);
router.use(betRouter);
router.use(gameRouter);

export default router;
