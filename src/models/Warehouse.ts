import {
  DataTypes,
  Model,
  Optional
} from "sequelize";

import database from "../config/database";

export interface WarehouseAttributes {
  id: number;
  name: string;
  location: string;
  status: boolean;
}

export interface WarehouseCreationAttributes
  extends Optional<
    WarehouseAttributes,
    "id" | "status"
  > {}

class Warehouse
  extends Model<
    WarehouseAttributes,
    WarehouseCreationAttributes
  >
  implements WarehouseAttributes {

  declare id: number;
  declare name: string;
  declare location: string;
  declare status: boolean;
}

Warehouse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    location: {
      type: DataTypes.STRING,
      allowNull: false
    },

    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize: database,
    tableName: "warehouses",
    timestamps: true
  }
);

export default Warehouse;