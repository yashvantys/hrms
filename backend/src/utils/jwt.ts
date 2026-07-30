import jwt from "jsonwebtoken";
import env from "../config/env";

export const generateAccessToken = (payload: object) =>
  jwt.sign(payload, env.jwtSecret, {
    expiresIn: "1h",
  });
export const generateRefreshToken = (payload: object) =>
  jwt.sign(payload, env.jwtSecret, {
    expiresIn: "1d",
  });
export interface AccessTokenPayload {
  id: number;
  email: string;
  role?: string;
}
export const verifyAccessToken = (token: string): AccessTokenPayload => {
  try {
    const payload = jwt.verify(token, env.jwtSecret) as AccessTokenPayload;
    return payload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};