import {
  Request,
  Response
} from "express";

import {
  createWarehouse,
  deleteWarehouse,
  getWarehouseById,
  getWarehouses,
  updateWarehouse
} from "../services/warehouse.service";

export const getAllWarehouses = async (
  _req: Request,
  res: Response
): Promise<Response> => {

  try {

    const warehouses =
      await getWarehouses();

    return res.status(200).json(
      warehouses
    );

  } catch (error) {

    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Error getting warehouses"
    });
  }
};

export const getWarehouse = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    const warehouse =
      await getWarehouseById(
        Number(req.params.id)
      );

    return res.status(200).json(
      warehouse
    );

  } catch (error) {

    return res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : "Warehouse not found"
    });
  }
};

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    const warehouse =
      await createWarehouse(
        req.body
      );

    return res.status(201).json({
      message:
        "Warehouse created successfully",
      warehouse
    });

  } catch (error) {

    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error creating warehouse"
    });
  }
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    const warehouse =
      await updateWarehouse(
        Number(req.params.id),
        req.body
      );

    return res.status(200).json({
      message:
        "Warehouse updated successfully",
      warehouse
    });

  } catch (error) {

    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error updating warehouse"
    });
  }
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    await deleteWarehouse(
      Number(req.params.id)
    );

    return res.status(200).json({
      message:
        "Warehouse logically deleted"
    });

  } catch (error) {

    return res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : "Warehouse not found"
    });
  }
};