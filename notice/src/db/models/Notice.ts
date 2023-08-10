import { connection } from "../config/config";
import { DataTypes } from "sequelize";

const Notice = connection.define(
  "Notice",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    startDateTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "notices",
  }
);

export { Notice };
