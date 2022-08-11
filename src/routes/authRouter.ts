import { Router } from "express";

import { authController } from "../controllers/authController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/validateToken.js";
import { signinSchema, signupSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post(
  "/sign-up",
  validateSchema(signupSchema),
  authController.signup,
);
authRouter.post(
  "/sign-in",
  validateSchema(signinSchema),
  authController.signin,
);
authRouter.post("/auto-login", validateToken, authController.autologin);
authRouter.post("/admin-login", validateToken, authController.adminlogin);

export default authRouter;
