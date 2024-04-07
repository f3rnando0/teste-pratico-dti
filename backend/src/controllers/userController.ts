import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { ZodError, z } from "zod";
import { JwtPayload, verify } from "jsonwebtoken";
import { env } from "../env";
import BadRequestError from "../errors/badRequest";
import UnathorizedError from "../errors/unauthorizedError";

const userService = new UserService();

export class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const schema = z.object({
      name: z.string().min(3).max(32),
      email: z.string().email(),
      password: z.string().min(6),
    });

    try {
      schema.parse({ name, email, password });

      const user = await userService.create({ name, email, password });

      return response.status(201).json(user);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestError({
          code: 400,
          message: error.message,
        });
      }

      throw new BadRequestError({ code: 400, message: error.message });
    }
  }

  async authorize(request: Request, response: Response) {
    const { email, password } = request.body;

    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    try {
      schema.parse({ email, password });

      const { user, accessToken } = await userService.authorize({
        email,
        password,
      });

      delete user.password;

      response.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
      });

      return response.status(200).json({ user, accessToken });
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        throw new BadRequestError({
          code: 400,
          message: error.message,
        });
      }

      throw new UnathorizedError(error.message);
    }
  }

  async me(request: Request, response: Response) {
    const token = request.cookies["access_token"];

    const isValid = verify(token, env.JWT_SECRET_KEY) as JwtPayload;

    if (!isValid)
      throw new UnathorizedError({ code: 401, message: "Unathorized" });

    if (isValid.id) {
      const user = await userService.findUserById(isValid.id);

      return response.status(200).json(user);
    }

    throw new UnathorizedError({ code: 401, message: "Unathorized" });
  }

  async createAnnotation(request: Request, response: Response) {
    const { annotationName, annotationDate } = request.body;
    const token = request.cookies["access_token"];

    if (!token)
      throw new UnathorizedError({ code: 401, message: "Unathorized" });

    const schema = z.object({
      annotationName: z.string(),
      annotationDate: z.string(),
    });

    try {
      schema.parse({ annotationName, annotationDate });

      const isValid = verify(token, env.JWT_SECRET_KEY) as JwtPayload;

      if (isValid.id) {
        const annotation = await userService.createAnnotation({
          userId: isValid.id,
          annotationName,
          annotationDate,
        });

        return response.status(200).json(annotation);
      }

      throw new UnathorizedError({ code: 401, message: "Unathorized" });
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestError({
          code: 400,
          message: error.message,
        });
      }

      throw new BadRequestError({ code: 401, message: error.message });
    }
  }

  async deleteAnnotation(request: Request, response: Response) {
    const { annotationId } = request.params;
    const token = request.cookies["access_token"];

    if (!token)
      throw new UnathorizedError({ code: 401, message: "Unathorized" });

    const schema = z.object({
      annotationId: z.string(),
    });

    try {
      schema.parse({ annotationId });

      const isValid = verify(token, env.JWT_SECRET_KEY) as JwtPayload;

      if (isValid.id) {
        const annotation = await userService.deleteAnnotation({
          userId: isValid.id,
          annotationId,
        });

        return response.status(200).json(annotation);
      }

      throw new UnathorizedError({ code: 401, message: "Unathorized" });
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestError({
          code: 400,
          message: error.message,
        });
      }

      throw new BadRequestError({ code: 401, message: error.message });
    }
  }
  async patchAnnotation(request: Request, response: Response) {
    const { annotationId, annotationName, annotationDate } = request.body;
    const token = request.cookies["access_token"];

    if (!token)
      throw new UnathorizedError({ code: 401, message: "Unathorized" });

    const schema = z.object({
      annotationId: z.string(),
      annotationName: z.string(),
      annotationDate: z.string(),
    });

    try {
      schema.parse({ annotationId, annotationName, annotationDate });

      const isValid = verify(token, env.JWT_SECRET_KEY) as JwtPayload;

      if (isValid.id) {
        const annotation = await userService.patchAnnotation({
          userId: isValid.id,
          annotationId,
          annotationName,
          annotationDate,
        });

        return response.status(200).json(annotation);
      }

      throw new UnathorizedError({ code: 401, message: "Unathorized" });
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestError({
          code: 400,
          message: error.message,
        });
      }

      throw new BadRequestError({ code: 401, message: error.message });
    }
  }
}
