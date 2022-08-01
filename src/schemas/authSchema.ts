import Joi from "joi";
import { SignupInsertData, UserInsertData } from "../interfaces/createData.js";

export const signupSchema = Joi.object<SignupInsertData>({
  name: Joi.string().required(),
  password: Joi.string().min(4).required(),
  passwordConfirmation: Joi.ref("password"),
});

export const signinSchema = Joi.object<UserInsertData>({
  name: Joi.string().required(),
  password: Joi.string().min(4).required(),
});
