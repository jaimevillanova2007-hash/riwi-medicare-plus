import {
  DataTypes,
  Model,
  Optional
} from "sequelize";

import database from "../config/database";

export interface ClinicAttributes {
  id: number;
  name: string;
  nit: string;
  responsibleName: string;
  responsibleEmail: string;
  status: boolean;
}

export interface ClinicCreationAttributes
  extends Optional<
    ClinicAttributes,
    "id" | "status"
  > {}

class Clinic
  extends Model<
    ClinicAttributes,
    ClinicCreationAttributes
  >
  implements ClinicAttributes {

  declare id: number;
  declare name: string;
  declare nit: string;
  declare responsibleName: string;
  declare responsibleEmail: string;
  declare status: boolean;
}

Clinic.init(
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

    nit: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    responsibleName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    responsibleEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
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
    tableName: "clinics",
    timestamps: true
  }
);

export default Clinic;