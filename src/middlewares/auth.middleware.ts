import { NextFunction, Request, Response } from "express";
import userModel from "../domain/accounts/users/users.model";

export default async function authMiddleware(
  req: Request,
  _: Response,
  next: NextFunction
) {
  try {
    const accessToken = req.headers.authorization?.split("Bearer ")[1];
    if (!accessToken) return next();

    const user = await userModel.getUserByAccessToken(accessToken);
    if (!user) throw new Error("User Not Found");

    req.user = user;

    next();
  } catch (e) {
    next(e);
  }
}
