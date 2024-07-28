import { constants } from "http2";
import { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/token.service";

export const SECRET_KEY: Secret = "your-secret-key-here";

export interface AuthRequest extends Request {
  userId?: string;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = verifyToken(token);

    (req as AuthRequest).userId = decoded.userId;

    next();
  } catch (err) {
    res.status(constants.HTTP_STATUS_UNAUTHORIZED).send("please authenticate");
  }
};
