import User from "./User";
import Clinic from "./Clinic";
import Warehouse from "./Warehouse";
import Medicine from "./Medicine";
import Inventory from "./Inventory";
import Request from "./Request";

User.hasMany(Request, {
  foreignKey: "createdBy",
  as: "requests"
});

Request.belongsTo(User, {
  foreignKey: "createdBy",
  as: "creator"
});

Clinic.hasMany(Request, {
  foreignKey: "clinicId",
  as: "requests"
});

Request.belongsTo(Clinic, {
  foreignKey: "clinicId",
  as: "clinic"
});

Warehouse.hasMany(Request, {
  foreignKey: "warehouseId",
  as: "requests"
});

Request.belongsTo(Warehouse, {
  foreignKey: "warehouseId",
  as: "warehouse"
});

Medicine.hasMany(Request, {
  foreignKey: "medicineId",
  as: "requests"
});

Request.belongsTo(Medicine, {
  foreignKey: "medicineId",
  as: "medicine"
});

Warehouse.hasMany(Inventory, {
  foreignKey: "warehouseId",
  as: "inventory"
});

Inventory.belongsTo(Warehouse, {
  foreignKey: "warehouseId",
  as: "warehouse"
});

Medicine.hasMany(Inventory, {
  foreignKey: "medicineId",
  as: "inventory"
});

Inventory.belongsTo(Medicine, {
  foreignKey: "medicineId",
  as: "medicine"
});

export {
  User,
  Clinic,
  Warehouse,
  Medicine,
  Inventory,
  Request
};