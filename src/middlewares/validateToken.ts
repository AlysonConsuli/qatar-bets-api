import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "../config/setup.js";

import { unauthorizedError } from "./errorHandlingMiddleware.js";

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();
  if (!token) {
    throw unauthorizedError(
      "You must pass an authorization token in the request header!",
    );
  }
  const hasBearer = authorization?.match(/Bearer/);
  if (!hasBearer) {
    throw unauthorizedError(
      "Authorization header must have 'Bearer' at the beggining!",
    );
  }
  const secretKey = process.env.JWT_SECRET_KEY;
  try {
    const data: any = jwt.verify(token, secretKey);
    res.locals.user = data;
    res.locals.token = token;
  } catch {
    throw unauthorizedError("Invalid token!");
  }
  next();
};
