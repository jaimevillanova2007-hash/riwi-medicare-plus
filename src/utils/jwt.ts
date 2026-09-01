import jwt from "jsonwebtoken";
import { UserRole } from "../models/User";

const JWT_SECRET: string = process.env.JWT_SECRET || "";

if (!JWT_SECRET) {
  throw new Error(
    "JWT_SECRET no está configurado en el archivo .env"
  );
}

export interface JwtPayload {
  id: number;
  role: UserRole;
}

export const generateToken = (
  payload: JwtPayload
): string => {
  const expiresIn = (
    process.env.JWT_EXPIRES_IN || "2h"
  ) as NonNullable<jwt.SignOptions["expiresIn"]>;

  return jwt.sign(
    payload,
    JWT_SECRET,
    {
      expiresIn
    }
  );
};

export const verifyToken = (
  token: string
): JwtPayload => {
  return jwt.verify(
    token,
    JWT_SECRET
  ) as JwtPayload;
};