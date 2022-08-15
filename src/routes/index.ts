import { Router } from "express";
import "../config/setup.js";

import authRouter from "./authRouter.js";
import betRouter from "./betsRouter.js";
import gameRouter from "./gamesRouter.js";
import userRouter from "./usersRouter.js";
import e2eRouter from "./e2eTestsRouter.js";

const router = Router();
router.use(authRouter);
router.use(betRouter);
router.use(gameRouter);
router.use(userRouter);
//route to e2e:
if (process.env.NODE_ENV === "test") {
  router.use(e2eRouter);
}

export default router;
