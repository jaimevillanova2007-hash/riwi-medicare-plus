import {
  DataTypes,
  Model,
  Optional
} from "sequelize";

import database from "../config/database";

export interface InventoryAttributes {
  id: number;
  warehouseId: number;
  medicineId: number;
  quantity: number;
  status: boolean;
}

export interface InventoryCreationAttributes
  extends Optional<
    InventoryAttributes,
    "id" | "status"
  > {}

class Inventory
  extends Model<
    InventoryAttributes,
    InventoryCreationAttributes
  >
  implements InventoryAttributes {

  declare id: number;
  declare warehouseId: number;
  declare medicineId: number;
  declare quantity: number;
  declare status: boolean;
}

Inventory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    warehouseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    medicineId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },

    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize: database,
    tableName: "inventory",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: [
          "warehouseId",
          "medicineId"
        ]
      }
    ]
  }
);

export default Inventory;