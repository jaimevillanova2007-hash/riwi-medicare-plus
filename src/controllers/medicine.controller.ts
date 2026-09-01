import {
  Request,
  Response
} from "express";

import {
  createMedicine,
  deleteMedicine,
  getMedicineById,
  getMedicines,
  updateMedicine
} from "../services/medicine.service";

export const getAllMedicines = async (
  _req: Request,
  res: Response
): Promise<Response> => {

  try {

    const medicines =
      await getMedicines();

    return res.status(200).json(
      medicines
    );

  } catch (error) {

    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Error getting medicines"
    });
  }
};

export const getMedicine = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    const medicine =
      await getMedicineById(
        Number(req.params.id)
      );

    return res.status(200).json(
      medicine
    );

  } catch (error) {

    return res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : "Medicine not found"
    });
  }
};

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    const medicine =
      await createMedicine(
        req.body
      );

    return res.status(201).json({
      message:
        "Medicine created successfully",
      medicine
    });

  } catch (error) {

    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error creating medicine"
    });
  }
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    const medicine =
      await updateMedicine(
        Number(req.params.id),
        req.body
      );

    return res.status(200).json({
      message:
        "Medicine updated successfully",
      medicine
    });

  } catch (error) {

    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error updating medicine"
    });
  }
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    await deleteMedicine(
      Number(req.params.id)
    );

    return res.status(200).json({
      message:
        "Medicine logically deleted"
    });

  } catch (error) {

    return res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : "Medicine not found"
    });
  }
};