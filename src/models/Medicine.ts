import {
  DataTypes,
  Model,
  Optional
} from "sequelize";

import database from "../config/database";

export interface MedicineAttributes {
  id: number;
  name: string;
  description: string;
  status: boolean;
}

export interface MedicineCreationAttributes
  extends Optional<
    MedicineAttributes,
    "id" | "status"
  > {}

class Medicine
  extends Model<
    MedicineAttributes,
    MedicineCreationAttributes
  >
  implements MedicineAttributes {

  declare id: number;
  declare name: string;
  declare description: string;
  declare status: boolean;
}

Medicine.init(
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

    description: {
      type: DataTypes.TEXT,
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
    tableName: "medicines",
    timestamps: true
  }
);

export default Medicine;