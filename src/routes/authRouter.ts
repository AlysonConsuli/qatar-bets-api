import { Router } from "express";

import { signin, signup } from "../controllers/authController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { signinSchema, signupSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signupSchema), signup);
authRouter.post("/sign-in", validateSchema(signinSchema), signin);

export default authRouter;
