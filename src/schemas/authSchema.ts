import Joi from "joi";
import { SignupInsertData, UserInsertData } from "../interfaces/createData.js";

export const signupSchema = Joi.object<SignupInsertData>({
  name: Joi.string().required(),
  password: Joi.string().required(),
  passwordConfirmation: Joi.ref("password"),
});

export const signinSchema = Joi.object<UserInsertData>({
  name: Joi.string().email().required(),
  password: Joi.string().required(),
});
