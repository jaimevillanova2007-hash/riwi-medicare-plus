import {
  DataTypes,
  Model,
  Optional
} from "sequelize";

import database from "../config/database";

export type RequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "DELIVERED"
  | "CANCELLED";

export interface RequestAttributes {
  id: number;
  clinicId: number;
  medicineId: number;
  warehouseId: number;
  quantity: number;
  status: RequestStatus;
  createdBy: number;
  active: boolean;
}

export interface RequestCreationAttributes
  extends Optional<
    RequestAttributes,
    "id" | "status" | "active"
  > {}

class Request
  extends Model<
    RequestAttributes,
    RequestCreationAttributes
  >
  implements RequestAttributes {

  declare id: number;
  declare clinicId: number;
  declare medicineId: number;
  declare warehouseId: number;
  declare quantity: number;
  declare status: RequestStatus;
  declare createdBy: number;
  declare active: boolean;
}

Request.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    clinicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    medicineId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    warehouseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },

    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "APPROVED",
        "REJECTED",
        "DELIVERED",
        "CANCELLED"
      ),
      allowNull: false,
      defaultValue: "PENDING"
    },

    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize: database,
    tableName: "requests",
    timestamps: true
  }
);

export default Request;