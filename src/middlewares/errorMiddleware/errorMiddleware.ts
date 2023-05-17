import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../types/customError";
import { ValidationError } from "express-validation";

const debug = createDebug("items-api:server:middlewares:errorMiddleware");

export const errorNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError(404, "Not found", "");
  next(error);
};

export const generalErrorMiddleware = (
  error: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ValidationError) {
    const validationError = error.details
      .body!.map((joiError) => joiError.message)
      .join(" & ")
      .replaceAll("\\/", "");
    error.publicMessage = validationError;
    debug(validationError);
  }

  const statusCode = error.statusCode || 500;

  const message = error.statusCode
    ? error.publicMessage
    : "Internal Server Error";
  res.status(statusCode).json({ message });
};
