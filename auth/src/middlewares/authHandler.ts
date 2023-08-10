import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHandler && authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SALT, (err: any, user: any) => {
    if (err) {
      return res.status(401);
    }

    req[user] = user;
    next();
  });
};
