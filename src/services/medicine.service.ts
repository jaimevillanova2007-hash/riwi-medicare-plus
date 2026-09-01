import { Medicine } from "../models";

export const getMedicines = async () => {
  return await Medicine.findAll({
    where: {
      status: true
    }
  });
};

export const getMedicineById = async (
  id: number
) => {

  const medicine = await Medicine.findOne({
    where: {
      id,
      status: true
    }
  });

  if (!medicine) {
    throw new Error("Medicine not found");
  }

  return medicine;
};

export const createMedicine = async (data: {
  name: string;
  description: string;
}) => {

  if (!data.name || !data.description) {
    throw new Error(
      "Name and description are required"
    );
  }

  const existingMedicine =
    await Medicine.findOne({
      where: {
        name: data.name
      }
    });

  if (existingMedicine) {
    throw new Error(
      "A medicine with this name already exists"
    );
  }

  return await Medicine.create({
    name: data.name,
    description: data.description,
    status: true
  });
};

export const updateMedicine = async (
  id: number,
  data: {
    name?: string;
    description?: string;
  }
) => {

  const medicine =
    await getMedicineById(id);

  if (data.name) {

    const existingMedicine =
      await Medicine.findOne({
        where: {
          name: data.name
        }
      });

    if (
      existingMedicine &&
      existingMedicine.id !== id
    ) {
      throw new Error(
        "A medicine with this name already exists"
      );
    }
  }

  await medicine.update(data);

  return medicine;
};

export const deleteMedicine = async (
  id: number
) => {

  const medicine =
    await getMedicineById(id);

  await medicine.update({
    status: false
  });
};


//¿Qué hace?

//Permite:

//POST    /api/medicines
//GET     /api/medicines
//GET     /api/medicines/:id
//PUT     /api/medicines/:id
//DELETE  /api/medicines/:id

//Además:

//valida campos obligatorios;
//evita medicamentos duplicados;
//permite actualizar;
//utiliza eliminación lógica.