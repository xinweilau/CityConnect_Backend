import { connection } from "./config/config";
import { Notice } from "./models";

export const initializeDatabase = async () => {
  try {
    await connection.authenticate();
    await Notice.sync({});

    console.log("Successfully synced with the database");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
