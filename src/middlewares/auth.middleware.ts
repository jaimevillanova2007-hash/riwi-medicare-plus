import {
  NextFunction,
  Request,
  Response
} from "express";

import {
  verifyToken
} from "../utils/jwt";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  const authorization =
    req.headers.authorization;

  if (!authorization) {

    res.status(401).json({
      message:
        "Authentication token required"
    });

    return;
  }

  const [
    type,
    token
  ] = authorization.split(" ");

  if (
    type !== "Bearer" ||
    !token
  ) {

    res.status(401).json({
      message:
        "Invalid authorization format"
    });

    return;
  }

  try {

    const payload =
      verifyToken(token);

    req.user = {
      id: payload.id,
      role: payload.role
    };

    next();

  } catch {

    res.status(401).json({
      message:
        "Invalid or expired token"
    });
  }
};