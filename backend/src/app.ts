import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "express-async-errors";

import { router } from "./routes";
import { run } from "./database";
import { ErrorHandlerMiddleware } from "./middleware/errorHandlerMiddleware";
import BadRequestError from "./errors/badRequest";
import { env } from "./env";

export const app = express();
run();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: env.CLIENT_URL,
  })
);
app.use("/api", router);
app.all("*", () => {
  throw new BadRequestError({ code: 404, message: "Not Found" });
});
app.use(ErrorHandlerMiddleware);
