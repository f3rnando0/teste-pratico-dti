import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { env } from "../env";

export const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
    const token = request.cookies['access_token'];   
 
    if(!token) return response.status(401).json({});

    const isTokenValid = verify(token, env.JWT_SECRET_KEY);

    if(!isTokenValid) return response.status(401).json({});

    next();
}