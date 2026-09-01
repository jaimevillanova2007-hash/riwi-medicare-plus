import {
  Request,
  Response
} from "express";

import {
  login,
  register
} from "../services/auth.service";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    const user =
      await register(req.body);

    return res.status(201).json({
      message:
        "User registered successfully",
      user
    });

  } catch (error) {

    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Registration error"
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    const result =
      await login(req.body);

    return res.status(200).json(result);

  } catch (error) {

    return res.status(401).json({
      message:
        error instanceof Error
          ? error.message
          : "Login error"
    });
  }
};