import { connection } from "../config/config";
import { DataTypes } from "sequelize";

const User = connection.define(
  "user",
  {
    id: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
      validate: {
        isAlphanumeric: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      },
    },
    postal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
  }
);

export { User };
