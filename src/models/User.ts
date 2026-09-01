import {
  DataTypes,
  Model,
  Optional
} from "sequelize";

import database from "../config/database";

export type UserRole = "ADMIN" | "GESTOR";

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: boolean;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "status"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {

  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: UserRole;
  declare status: boolean;
}

User.init(
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

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    role: {
      type: DataTypes.ENUM(
        "ADMIN",
        "GESTOR"
      ),
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
    tableName: "users",
    timestamps: true
  }
);

export default User;