import { Router } from "express";
import { body, validationResult } from "express-validator";
import authGuard from "../../guard/auth.guard";
import { CommentUpdateData, CommentWriteData } from "./comments/comments.dto";
import commentsService from "./comments/comments.service";
import { TweetCreateData, TweetUpdateData } from "./tweets.dto";
import tweetsService from "./tweets.service";

const tweetController = Router();

/*
 * [start] tweets
 */

tweetController.get("/:tweetId", async (req, res, _) => {
  const { tweetId } = req.params;
  res.json(await tweetsService.getTweet(Number(tweetId)));
});

tweetController.get("", async (_, res, __) => {
  res.json(await tweetsService.getTweets());
});

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

/*
 * [start] tweets - comments
 */

tweetController.post(
  "/:tweetId/comments",
  authGuard,
  body("content").notEmpty().withMessage("댓글 내용을 입력하세요"),
  async (req, res, _) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { tweetId } = req.params;
    const data: CommentWriteData = req.body;
    const user = req.user;

    res.json(await commentsService.writeComment(Number(tweetId), data, user));
  }
);

tweetController.patch(
  "/:tweetId/comments/:commentId",
  authGuard,
  body("content").notEmpty().withMessage("수정할 댓글 내용을 입력하세요"),
  async (req, res, _) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { tweetId, commentId } = req.params;
    const data: CommentUpdateData = req.body;
    const user = req.user;

    res.json(
      await commentsService.updateComment(
        Number(tweetId),
        Number(commentId),
        data,
        user
      )
    );
  }
);

tweetController.delete(
  "/:tweetId/comments/:commentId",
  authGuard,
  async (req, res, _) => {
    const { tweetId, commentId } = req.params;
    const user = req.user;

    res.json(
      await commentsService.deleteComment(
        Number(commentId),
        Number(tweetId),
        user
      )
    );
  }
);

/*
 * [END] tweets - comments
 */

export default tweetController;
