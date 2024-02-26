import { Router } from "express";
import userController from "./accounts/users/users.controller";
import connectionController from "./connections/connections.controller";
import tweetController from "./tweets/tweets.controller";

const controllers = Router();

controllers.use("/accounts/users", userController);
controllers.use("/tweets", tweetController);
controllers.use(connectionController);

export default controllers;
