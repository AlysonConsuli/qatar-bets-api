import { Router } from "express";

import {
  getRanking,
  getUsers,
  postPayment,
} from "../controllers/usersControllers.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/validateToken.js";
import { paymentSchema } from "../schemas/usersSchema.js";

const userRouter = Router();

userRouter.use(validateToken);
userRouter.post("/user/payment", validateSchema(paymentSchema), postPayment);
userRouter.get("/users/ranking", getRanking);
userRouter.get("/users", getUsers);

export default userRouter;
