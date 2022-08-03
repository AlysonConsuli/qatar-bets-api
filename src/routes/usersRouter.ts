import { Router } from "express";

import { getRanking, postPayment } from "../controllers/usersControllers.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { paymentSchema } from "../schemas/usersSchema.js";

const userRouter = Router();

userRouter.post("/user/payment", validateSchema(paymentSchema), postPayment);
userRouter.get("/users/ranking", getRanking);

export default userRouter;
