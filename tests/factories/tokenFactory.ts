import jwt from "jsonwebtoken";
import * as userFactory from "./userFactory.js";

export const createToken = async () => {
  const user = userFactory.userBody();
  const createdUser = await userFactory.createUser(user);
  const secretKey = process.env.JWT_SECRET_KEY;

  const token: string = jwt.sign(createdUser, secretKey);
  return token;
};
