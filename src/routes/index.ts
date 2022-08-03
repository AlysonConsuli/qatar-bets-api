import { Router } from "express";

import authRouter from "./authRouter.js";
import betRouter from "./betsRouter.js";
import gameRouter from "./gamesRouter.js";
import userRouter from "./usersRouter.js";

const router = Router();
router.use(authRouter);
router.use(betRouter);
router.use(gameRouter);
router.use(userRouter);

export default router;
