import { Router } from "express";
import userController from "./accounts/users/users.controller";

const controllers = Router();

controllers.use("/accounts/users", userController);

export default controllers;
