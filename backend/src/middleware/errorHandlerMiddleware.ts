import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/customError";

export const ErrorHandlerMiddleware = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    const { statusCode, errors, logging } = err;
    if (logging) {
      console.error(
        JSON.stringify(
          {
            code: err.statusCode,
            errors: err.errors,
            stack: err.stack,
          },
          null,
          2
        )
      );
    }

    return response.status(statusCode).send({ errors });
  }

  console.error(JSON.stringify(err, null, 2));
  return response
    .status(500)
    .send({ errors: [{ message: "Unexpected error" }] });
};
