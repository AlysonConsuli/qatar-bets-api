import { Router } from "express";

import { usersControllers } from "../controllers/usersControllers.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/validateToken.js";
import { paymentSchema } from "../schemas/usersSchema.js";

const userRouter = Router();

userRouter.use(validateToken);
userRouter.post(
  "/user/payment",
  validateSchema(paymentSchema),
  usersControllers.postPayment,
);
userRouter.get("/users/ranking", usersControllers.getRanking);
userRouter.get("/users", usersControllers.getUsers);

export default userRouter;
