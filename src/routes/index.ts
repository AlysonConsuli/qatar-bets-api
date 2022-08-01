import { Router } from "express";

import authRouter from "./authRouter.js";
import betRouter from "./betsRouter.js";

const router = Router();
router.use(authRouter);
router.use(betRouter);

export default router;
