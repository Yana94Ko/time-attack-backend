import { Router } from "express";
import userController from "./accounts/users/users.controller";
import tweetController from "./tweets/tweets.controller";

const controllers = Router();

controllers.use("/accounts/users", userController);
controllers.use("/tweets", tweetController);

export default controllers;
