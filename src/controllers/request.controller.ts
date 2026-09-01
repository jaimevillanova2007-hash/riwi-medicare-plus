import {
  Request as ExpressRequest,
  Response
} from "express";

import {
  createRequest,
  deleteRequest,
  getRequestById,
  getRequests,
  updateRequestStatus
} from "../services/request.service";

export const getAllRequests = async (
  _req: ExpressRequest,
  res: Response
): Promise<Response> => {

  try {

    const requests =
      await getRequests();

    return res.status(200).json(
      requests
    );

  } catch (error) {

    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Error getting requests"
    });
  }
};

export const getRequest = async (
  req: ExpressRequest,
  res: Response
): Promise<Response> => {

  try {

    const request =
      await getRequestById(
        Number(req.params.id)
      );

    return res.status(200).json(
      request
    );

  } catch (error) {

    return res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : "Request not found"
    });
  }
};

export const create = async (
  req: ExpressRequest,
  res: Response
): Promise<Response> => {

  try {

    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required"
      });
    }

    const request =
      await createRequest({
        ...req.body,
        clinicId: Number(
          req.body.clinicId
        ),
        medicineId: Number(
          req.body.medicineId
        ),
        warehouseId: Number(
          req.body.warehouseId
        ),
        quantity: Number(
          req.body.quantity
        ),
        createdBy: req.user.id
      });

    return res.status(201).json({
      message:
        "Request created successfully",
      request
    });

  } catch (error) {

    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error creating request"
    });
  }
};

export const updateStatus = async (
  req: ExpressRequest,
  res: Response
): Promise<Response> => {

  try {

    const request =
      await updateRequestStatus(
        Number(req.params.id),
        req.body.status
      );

    return res.status(200).json({
      message:
        "Request status updated successfully",
      request
    });

  } catch (error) {

    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Error updating request"
    });
  }
};

export const remove = async (
  req: ExpressRequest,
  res: Response
): Promise<Response> => {

  try {

    await deleteRequest(
      Number(req.params.id)
    );

    return res.status(200).json({
      message:
        "Request logically deleted"
    });

  } catch (error) {

    return res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : "Request not found"
    });
  }
};