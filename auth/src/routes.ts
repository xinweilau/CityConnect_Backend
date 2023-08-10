import express from "express";
import { mockAuthenticateUser } from "./services/authServices";

const authRoute = express.Router();

authRoute.get("/", mockAuthenticateUser);

export default authRoute;
