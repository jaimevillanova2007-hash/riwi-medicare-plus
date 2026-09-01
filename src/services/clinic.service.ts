import { Clinic } from "../models";

export const getClinics = async () => {
  return await Clinic.findAll({
    where: {
      status: true
    }
  });
};

export const getClinicById = async (id: number) => {
  const clinic = await Clinic.findOne({
    where: {
      id,
      status: true
    }
  });

  if (!clinic) {
    throw new Error("Clinic not found");
  }

  return clinic;
};

export const createClinic = async (data: {
  name: string;
  nit: string;
  responsibleName: string;
  responsibleEmail: string;
}) => {

  if (
    !data.name ||
    !data.nit ||
    !data.responsibleName ||
    !data.responsibleEmail
  ) {
    throw new Error(
      "All clinic fields are required"
    );
  }

  const existingClinic =
    await Clinic.findOne({
      where: {
        nit: data.nit
      }
    });

  if (existingClinic) {
    throw new Error(
      "A clinic with this NIT already exists"
    );
  }

  return await Clinic.create({
    name: data.name,
    nit: data.nit,
    responsibleName: data.responsibleName,
    responsibleEmail: data.responsibleEmail,
    status: true
  });
};

export const updateClinic = async (
  id: number,
  data: {
    name?: string;
    nit?: string;
    responsibleName?: string;
    responsibleEmail?: string;
  }
) => {

  const clinic = await getClinicById(id);

  if (data.nit) {

    const existingClinic =
      await Clinic.findOne({
        where: {
          nit: data.nit
        }
      });

    if (
      existingClinic &&
      existingClinic.id !== id
    ) {
      throw new Error(
        "A clinic with this NIT already exists"
      );
    }
  }

  await clinic.update(data);

  return clinic;
};

export const deleteClinic = async (
  id: number
) => {

  const clinic = await getClinicById(id);

  await clinic.update({
    status: false
  });
};


//quie estoy crenado las clinicas ,consultal clinica, consultar ID,
//actualizar clinica,eliminar logica, NIT unico ,validacion de campos 