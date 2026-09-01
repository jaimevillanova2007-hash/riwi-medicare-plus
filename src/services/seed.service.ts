import bcrypt from "bcrypt";

import {
  User,
  Clinic,
  Warehouse,
  Medicine,
  Inventory
} from "../models";

export const seedDatabase = async (): Promise<void> => {

  // =========================
  // USUARIOS
  // =========================

  const adminPassword = await bcrypt.hash(
    "Admin123",
    10
  );

  const gestorPassword = await bcrypt.hash(
    "Gestor123",
    10
  );

  const [admin] = await User.findOrCreate({
    where: {
      email: "admin@riwi.com"
    },
    defaults: {
      name: "Administrador",
      email: "admin@riwi.com",
      password: adminPassword,
      role: "ADMIN",
      status: true
    }
  });

  const [gestor] = await User.findOrCreate({
    where: {
      email: "gestor@riwi.com"
    },
    defaults: {
      name: "Gestor Riwi",
      email: "gestor@riwi.com",
      password: gestorPassword,
      role: "GESTOR",
      status: true
    }
  });

  // =========================
  // CLÍNICAS
  // =========================

  const [clinic1] = await Clinic.findOrCreate({
    where: {
      nit: "900123456-1"
    },
    defaults: {
      name: "Clínica Riwi Norte",
      nit: "900123456-1",
      responsibleName: "Laura Martínez",
      responsibleEmail: "laura@clinica.com",
      status: true
    }
  });

  const [clinic2] = await Clinic.findOrCreate({
    where: {
      nit: "900654321-2"
    },
    defaults: {
      name: "Clínica Riwi Centro",
      nit: "900654321-2",
      responsibleName: "Carlos Rodríguez",
      responsibleEmail: "carlos@clinica.com",
      status: true
    }
  });

  // =========================
  // ALMACENES
  // =========================

  const [warehouse1] = await Warehouse.findOrCreate({
    where: {
      name: "Almacén Principal"
    },
    defaults: {
      name: "Almacén Principal",
      location: "Barranquilla",
      status: true
    }
  });

  const [warehouse2] = await Warehouse.findOrCreate({
    where: {
      name: "Almacén Secundario"
    },
    defaults: {
      name: "Almacén Secundario",
      location: "Soledad",
      status: true
    }
  });

  // =========================
  // MEDICAMENTOS
  // =========================

  const [paracetamol] = await Medicine.findOrCreate({
    where: {
      name: "Paracetamol"
    },
    defaults: {
      name: "Paracetamol",
      description: "Analgésico y antipirético",
      status: true
    }
  });

  const [ibuprofen] = await Medicine.findOrCreate({
    where: {
      name: "Ibuprofeno"
    },
    defaults: {
      name: "Ibuprofeno",
      description: "Antiinflamatorio no esteroideo",
      status: true
    }
  });

  const [amoxicillin] = await Medicine.findOrCreate({
    where: {
      name: "Amoxicilina"
    },
    defaults: {
      name: "Amoxicilina",
      description: "Antibiótico",
      status: true
    }
  });

  // =========================
  // INVENTARIO
  // =========================

  await Inventory.findOrCreate({
    where: {
      warehouseId: warehouse1.id,
      medicineId: paracetamol.id
    },
    defaults: {
      warehouseId: warehouse1.id,
      medicineId: paracetamol.id,
      quantity: 100,
      status: true
    }
  });

  await Inventory.findOrCreate({
    where: {
      warehouseId: warehouse1.id,
      medicineId: ibuprofen.id
    },
    defaults: {
      warehouseId: warehouse1.id,
      medicineId: ibuprofen.id,
      quantity: 80,
      status: true
    }
  });

  await Inventory.findOrCreate({
    where: {
      warehouseId: warehouse1.id,
      medicineId: amoxicillin.id
    },
    defaults: {
      warehouseId: warehouse1.id,
      medicineId: amoxicillin.id,
      quantity: 50,
      status: true
    }
  });

  await Inventory.findOrCreate({
    where: {
      warehouseId: warehouse2.id,
      medicineId: paracetamol.id
    },
    defaults: {
      warehouseId: warehouse2.id,
      medicineId: paracetamol.id,
      quantity: 30,
      status: true
    }
  });

  await Inventory.findOrCreate({
    where: {
      warehouseId: warehouse2.id,
      medicineId: ibuprofen.id
    },
    defaults: {
      warehouseId: warehouse2.id,
      medicineId: ibuprofen.id,
      quantity: 40,
      status: true
    }
  });

  console.log("🌱 Base de datos inicializada correctamente");
  console.log("👤 Admin:", admin.email);
  console.log("👤 Gestor:", gestor.email);
  console.log("🏥 Clínicas:", clinic1.name, "-", clinic2.name);
  console.log("🏭 Almacenes:", warehouse1.name, "-", warehouse2.name);
  console.log("💊 Medicamentos: 3");
};