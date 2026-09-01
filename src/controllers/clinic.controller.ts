import {
  Request,
  Response
} from "express";

import {
  createClinic,
  deleteClinic,
  getClinicById,
  getClinics,
  updateClinic
} from "../services/clinic.service";

export const getAllClinics = async (
  _req: Request,
  res: Response
): Promise<Response> => {

  try {

    const clinics =
      await getClinics();

    return res.status(200).json(
      clinics
    );

  } catch (error) {

    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Error getting clinics"
    });
  }
};

export const getClinic = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    const clinic =
      await getClinicById(
        Number(req.params.id)
      );

    return res.status(200).json(
      clinic
    );

  } catch (error) {

    return res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : "Clinic not found"
    });
  }
};

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    const clinic =
      await createClinic(req.body);

    return res.status(201).json({
      message:
        "Clinic created successfully",
      clinic
    });

  } catch (error) {

    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error creating clinic"
    });
  }
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    const clinic =
      await updateClinic(
        Number(req.params.id),
        req.body
      );

    return res.status(200).json({
      message:
        "Clinic updated successfully",
      clinic
    });

  } catch (error) {

    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error updating clinic"
    });
  }
};

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {

  try {

    await deleteClinic(
      Number(req.params.id)
    );

    return res.status(200).json({
      message:
        "Clinic logically deleted"
    });

  } catch (error) {

    return res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : "Clinic not found"
    });
  }
};