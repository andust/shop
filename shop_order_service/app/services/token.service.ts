import jwt from "jsonwebtoken";

export interface TokenData {
  userId?: string;
}

export const verifyToken = (token: string): TokenData =>
  jwt.verify(token, "qwertyuiopasdfghjklzxcvbnm123456") as TokenData;
