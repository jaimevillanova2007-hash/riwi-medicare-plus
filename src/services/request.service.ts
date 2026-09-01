import {
  Clinic,
  Medicine,
  Warehouse,
  Inventory,
  Request
} from "../models";

import database from "../config/database";

export const getRequests = async () => {
  return await Request.findAll({
    where: {
      active: true
    },
    include: [
      {
        model: Clinic,
        as: "clinic"
      },
      {
        model: Medicine,
        as: "medicine"
      },
      {
        model: Warehouse,
        as: "warehouse"
      }
    ]
  });
};

export const getRequestById = async (
  id: number
) => {
  const request = await Request.findOne({
    where: {
      id,
      active: true
    },
    include: [
      {
        model: Clinic,
        as: "clinic"
      },
      {
        model: Medicine,
        as: "medicine"
      },
      {
        model: Warehouse,
        as: "warehouse"
      }
    ]
  });

  if (!request) {
    throw new Error("Request not found");
  }

  return request;
};

export const createRequest = async (data: {
  clinicId: number;
  medicineId: number;
  warehouseId: number;
  quantity: number;
  createdBy: number;
}) => {

  if (
    !data.clinicId ||
    !data.medicineId ||
    !data.warehouseId ||
    !data.createdBy
  ) {
    throw new Error(
      "Clinic, medicine, warehouse and user are required"
    );
  }

  if (
    !Number.isInteger(data.quantity) ||
    data.quantity <= 0
  ) {
    throw new Error(
      "Quantity must be greater than zero"
    );
  }

  const clinic = await Clinic.findOne({
    where: {
      id: data.clinicId,
      status: true
    }
  });

  if (!clinic) {
    throw new Error(
      "Clinic not found"
    );
  }

  const medicine = await Medicine.findOne({
    where: {
      id: data.medicineId,
      status: true
    }
  });

  if (!medicine) {
    throw new Error(
      "Medicine not found"
    );
  }

  const warehouse = await Warehouse.findOne({
    where: {
      id: data.warehouseId,
      status: true
    }
  });

  if (!warehouse) {
    throw new Error(
      "Warehouse not found"
    );
  }

  const transaction =
    await database.transaction();

  try {

    const inventory =
      await Inventory.findOne({
        where: {
          warehouseId: data.warehouseId,
          medicineId: data.medicineId,
          status: true
        },
        transaction,
        lock: transaction.LOCK.UPDATE
      });

    if (!inventory) {
      throw new Error(
        "Medicine is not available in this warehouse"
      );
    }

    if (
      inventory.quantity < data.quantity
    ) {
      throw new Error(
        `Insufficient inventory. Available: ${inventory.quantity}`
      );
    }

    await inventory.update(
      {
        quantity:
          inventory.quantity -
          data.quantity
      },
      {
        transaction
      }
    );

    const request =
      await Request.create(
        {
          clinicId: data.clinicId,
          medicineId: data.medicineId,
          warehouseId: data.warehouseId,
          quantity: data.quantity,
          status: "PENDING",
          createdBy: data.createdBy,
          active: true
        },
        {
          transaction
        }
      );

    await transaction.commit();

    return request;

  } catch (error) {

    await transaction.rollback();

    throw error;
  }
};

export const updateRequestStatus = async (
  id: number,
  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "DELIVERED"
    | "CANCELLED"
) => {

  const request =
    await getRequestById(id);

  await request.update({
    status
  });

  return request;
};

export const deleteRequest = async (
  id: number
) => {

  const request =
    await getRequestById(id);

  await request.update({
    active: false
  });
};


//¿Qué acabamos de hacer?

//Esta parte es especialmente importante:

//if (inventory.quantity < data.quantity) {

//Por ejemplo:

//Inventario = 50
//Solicitud = 30

//✅ Se permite.

//Queda:

//50 - 30 = 20

//Pero:

//Inventario = 20
//Solicitud = 50

//❌ No se permite.

//Devuelve:

//Insufficient inventory