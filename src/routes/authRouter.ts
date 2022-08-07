import { Router } from "express";

import {
  adminlogin,
  autologin,
  signin,
  signup,
} from "../controllers/authController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/validateToken.js";
import { signinSchema, signupSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signupSchema), signup);
authRouter.post("/sign-in", validateSchema(signinSchema), signin);
authRouter.post("/auto-login", validateToken, autologin);
authRouter.post("/admin-login", validateToken, adminlogin);

export default authRouter;
