import { Request, Response, NextFunction } from "express";
import { validate } from "uuid";

function middlewareHeader(
  request: Request,
  response: Response,
  next: NextFunction
): void | Response {
  const { user_id } = request.headers;
  if (!validate(String(user_id))) {
    return response.status(400).json({ error: "Error" });
  }
  return next();
}

function middlewareParams(
  request: Request,
  response: Response,
  next: NextFunction
): void | Response {
  const { user_id } = request.params;
  if (!validate(String(user_id))) {
    return response.status(404).json({ error: "Error" });
  }
  return next();
}

export { middlewareHeader, middlewareParams };
