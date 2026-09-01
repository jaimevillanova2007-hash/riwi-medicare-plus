import {
  Request,
  Response
} from "express";

import {
  createInventory,
  deleteInventory,
  getInventory,
  getInventoryById,
  updateInventory
} from "../services/inventory.service";

export const getAllInventory = async (
  _req: Request,
  res: Response
): Promise<Response> => {

  try {

    const inventory =
      await getInventory();

    return res.status(200).json(
      inventory
    );

  } catch (error) {

    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Error getting inventory"
    });
  }
};

export const getInventoryRecord = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    const inventory =
      await getInventoryById(
        Number(req.params.id)
      );

    return res.status(200).json(
      inventory
    );

  } catch (error) {

    return res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : "Inventory not found"
    });
  }
};

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    const inventory =
      await createInventory(
        req.body
      );

    return res.status(201).json({
      message:
        "Inventory created successfully",
      inventory
    });

  } catch (error) {

    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error creating inventory"
    });
  }
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    const inventory =
      await updateInventory(
        Number(req.params.id),
        Number(req.body.quantity)
      );

    return res.status(200).json({
      message:
        "Inventory updated successfully",
      inventory
    });

  } catch (error) {

    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error updating inventory"
    });
  }
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    await deleteInventory(
      Number(req.params.id)
    );

    return res.status(200).json({
      message:
        "Inventory logically deleted"
    });

  } catch (error) {

    return res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : "Inventory not found"
    });
  }
};