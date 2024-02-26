import { Router } from "express";
import connectionsService from "./connections.service";

const connectionController = Router();

connectionController.post("/followings/:userId", async (req, res, next) => {
  connectionsService.createFollowing();
});
connectionController.delete("/followings/:userId", , async (req, res, next) => {
    connectionsService.deleteFollowing();
  });

connectionController.delete("/followers/:userId");

export default connectionController;
