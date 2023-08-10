import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { initializeDatabase } from "./db";
import noticeRoute from "./routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/notices", noticeRoute);

app.listen(port, async () => {
  await initializeDatabase();

  return console.log(
    `CityConnect Notice service is listening on http://localhost:${port}`
  );
});
