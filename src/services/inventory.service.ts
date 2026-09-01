import {
  Inventory,
  Warehouse,
  Medicine
} from "../models";

export const getInventory = async () => {
  return await Inventory.findAll({
    where: {
      status: true
    },
    include: [
      {
        model: Warehouse,
        as: "warehouse"
      },
      {
        model: Medicine,
        as: "medicine"
      }
    ]
  });
};

export const getInventoryById = async (
  id: number
) => {
  const inventory = await Inventory.findOne({
    where: {
      id,
      status: true
    },
    include: [
      {
        model: Warehouse,
        as: "warehouse"
      },
      {
        model: Medicine,
        as: "medicine"
      }
    ]
  });

  if (!inventory) {
    throw new Error("Inventory record not found");
  }

  return inventory;
};

export const createInventory = async (data: {
  warehouseId: number;
  medicineId: number;
  quantity: number;
}) => {

  if (
    !data.warehouseId ||
    !data.medicineId
  ) {
    throw new Error(
      "Warehouse and medicine are required"
    );
  }

  if (data.quantity < 0) {
    throw new Error(
      "Quantity cannot be negative"
    );
  }

  const warehouse =
    await Warehouse.findOne({
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

  const medicine =
    await Medicine.findOne({
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

  const existingInventory =
    await Inventory.findOne({
      where: {
        warehouseId: data.warehouseId,
        medicineId: data.medicineId,
        status: true
      }
    });

  if (existingInventory) {
    throw new Error(
      "This medicine already exists in this warehouse"
    );
  }

  return await Inventory.create({
    warehouseId: data.warehouseId,
    medicineId: data.medicineId,
    quantity: data.quantity,
    status: true
  });
};

export const updateInventory = async (
  id: number,
  quantity: number
) => {

  if (quantity < 0) {
    throw new Error(
      "Quantity cannot be negative"
    );
  }

  const inventory =
    await getInventoryById(id);

  await inventory.update({
    quantity
  });

  return inventory;
};

export const deleteInventory = async (
  id: number
) => {

  const inventory =
    await getInventoryById(id);

  await inventory.update({
    status: false
  });
};