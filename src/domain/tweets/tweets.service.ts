import { User } from "@prisma/client";
import {
  TweetCreateData,
  TweetCreateDto,
  TweetDeleteDto,
  TweetUpdateData,
  TweetUpdateDto,
} from "./tweets.dto";
import tweetModel from "./tweets.model";

const getTweet = (tweetId: number) => {
  return tweetModel.getTweet(tweetId);
};
const getTweets = () => {
  return tweetModel.getTweets();
};

const writeTweet = async (
  data: TweetCreateData,
  user: Pick<User, "id" | "email">
) => {
  const dto: TweetCreateDto = { ...data, authorId: user.id };
  return await tweetModel.createTweet(dto);
};

const updateTweet = async (
  tweetId: number,
  data: TweetUpdateData,
  user: Pick<User, "id" | "email">
) => {
  const dto: TweetUpdateDto = { ...data, authorId: user.id, tweetId: tweetId };

  return await tweetModel.updateTweet(dto);
};

const deleteTweet = async (
  tweetId: number,
  user: Pick<User, "id" | "email">
) => {
  const dto: TweetDeleteDto = {
    tweetId,
    authorId: user.id,
  };

  return await tweetModel.deleteTweet(dto);
};

const tweetsService = {
  deleteTweet,
  writeTweet,
  updateTweet,
  getTweet,
  getTweets,
};

export default tweetsService;
