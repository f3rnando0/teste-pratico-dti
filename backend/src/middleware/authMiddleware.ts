import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { env } from "../env";
import UnathorizedError from "../errors/unauthorizedError";

export const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers["authorization"].toString();

  if (!token)
    throw new UnathorizedError({ code: 401, message: "Invalid token" });

  try {
    const isTokenValid = verify(token, env.JWT_SECRET_KEY);

    if (!isTokenValid)
      throw new UnathorizedError({ code: 401, message: "Invalid token" });

    next();
  } catch (error) {
    throw new UnathorizedError({ code: 401, message: error.message });
  }
};
