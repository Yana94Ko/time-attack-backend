import { Router } from "express";
import { body, validationResult } from "express-validator";
import authGuard from "../../guard/auth.guard";
import { TweetCreateData, TweetUpdateData } from "./tweets.dto";
import tweetsService from "./tweets.service";

const tweetController = Router();

/*
 * [start] tweets
 */
tweetController.post(
  "",
  authGuard,
  body("text").notEmpty().withMessage("tweet 내용을 입력하세요"),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const dto: TweetCreateData = req.body;
    const user = req.user;

    res.json(await tweetsService.writeTweet(dto, user));
  }
);

tweetController.patch(
  "/:tweetId",
  authGuard,
  body("text").notEmpty().withMessage("변경할 tweet 내용을 입력하세요"),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const dto: TweetUpdateData = req.body;
    const { tweetId } = req.params;
    const user = req.user;

    res.json(await tweetsService.updateTweet(Number(tweetId), dto, user));
  }
);

tweetController.delete("/:tweetId", authGuard, async (req, res, next) => {
  const { tweetId } = req.params;
  const user = req.user;

  res.json(await tweetsService.deleteTweet(Number(tweetId), user));
});

/*
 * [END] tweets
 */

export default tweetController;
