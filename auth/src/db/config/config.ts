import { Sequelize } from "sequelize";

export const connection = new Sequelize(process.env.DATABASE_URL, {
  logging: true,
});
