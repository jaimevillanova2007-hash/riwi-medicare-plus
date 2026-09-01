import { Warehouse } from "../models";

export const getWarehouses = async () => {
  return await Warehouse.findAll({
    where: {
      status: true
    }
  });
};

export const getWarehouseById = async (
  id: number
) => {
  const warehouse = await Warehouse.findOne({
    where: {
      id,
      status: true
    }
  });

  if (!warehouse) {
    throw new Error("Warehouse not found");
  }

  return warehouse;
};

export const createWarehouse = async (data: {
  name: string;
  location: string;
}) => {

  if (!data.name || !data.location) {
    throw new Error(
      "Name and location are required"
    );
  }

  return await Warehouse.create({
    name: data.name,
    location: data.location,
    status: true
  });
};

export const updateWarehouse = async (
  id: number,
  data: {
    name?: string;
    location?: string;
  }
) => {

  const warehouse =
    await getWarehouseById(id);

  await warehouse.update(data);

  return warehouse;
};

export const deleteWarehouse = async (
  id: number
) => {

  const warehouse =
    await getWarehouseById(id);

  await warehouse.update({
    status: false
  });
};