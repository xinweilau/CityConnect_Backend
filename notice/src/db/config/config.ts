import { Sequelize } from "sequelize";

const DB_URI = process.env.DB_URI || "<CONNECTION STRING>";
const LOG = true;

export const connection = new Sequelize(DB_URI, {
  logging: LOG,
});
