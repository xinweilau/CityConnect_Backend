import { Request, Response } from "express";
import { User } from "../db/models";
import jwt from "jsonwebtoken";

// In the absence of SingPass API, we mock the authentication process
export const mockAuthenticateUser = async (req: Request, res: Response) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).send("Missing id");
  }

  const user = await User.findOne({ where: { id } });
  if (!user) {
    return res.status(404).send("User with id not found");
  }

  const token = jwt.sign(user, process.env.JWT_SALT, { expiresIn: "3d" });
  return res.status(200).send({ token });
};
