import {
  NextFunction,
  Request,
  Response
} from "express";

import {
  UserRole
} from "../models/User";

export const authorizeRoles = (
  allowedRoles: UserRole[]
) => {

  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {

    if (!req.user) {

      res.status(401).json({
        message:
          "Authentication required"
      });

      return;
    }

    if (
      !allowedRoles.includes(
        req.user.role
      )
    ) {

      res.status(403).json({
        message:
          "You do not have permission to access this resource"
      });

      return;
    }

    next();
  };
};