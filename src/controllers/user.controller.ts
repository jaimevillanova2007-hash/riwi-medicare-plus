import {
  Request,
  Response
} from "express";

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser
} from "../services/user.service";

export const getAllUsers = async (
  _req: Request,
  res: Response
): Promise<Response> => {

  try {

    const users = await getUsers();

    return res.status(200).json(users);

  } catch (error) {

    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Error getting users"
    });
  }
};

export const getUser = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    const user = await getUserById(
      Number(req.params.id)
    );

    return res.status(200).json(user);

  } catch (error) {

    return res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : "User not found"
    });
  }
};

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    const user = await createUser(
      req.body
    );

    return res.status(201).json({
      message:
        "User created successfully",
      user
    });

  } catch (error) {

    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error creating user"
    });
  }
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    const user = await updateUser(
      Number(req.params.id),
      req.body
    );

    return res.status(200).json({
      message:
        "User updated successfully",
      user
    });

  } catch (error) {

    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error updating user"
    });
  }
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    await deleteUser(
      Number(req.params.id)
    );

    return res.status(200).json({
      message:
        "User logically deleted"
    });

  } catch (error) {

    return res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : "User not found"
    });
  }
};