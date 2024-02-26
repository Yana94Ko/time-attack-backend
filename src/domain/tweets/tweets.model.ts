import prismaClient from "../../db/prisma/client.prisma";
import { TweetCreateDto, TweetDeleteDto, TweetUpdateDto } from "./tweets.dto";

const getTweet = (tweetId: number) => {
  return prismaClient.tweet.findUnique({
    where: { id: tweetId },
    include: { comment: true },
  });
};
const getTweets = () => {
  return prismaClient.tweet.findMany({
    orderBy: { createdAt: "desc" },
    include: { comment: true },
  });
};

const writeTweet = async (dto: TweetCreateDto) => {
  const { text, authorId } = dto;
  return await prismaClient.tweet.create({ data: { text, authorId } });
};

const updateTweet = async (dto: TweetUpdateDto) => {
  const { tweetId, authorId, text } = dto;
  const tweet = prismaClient.tweet.findUnique({
    where: { id: tweetId, authorId },
  });
  if (!tweet) throw new Error("Not Found tweet");

  return await prismaClient.tweet.update({
    where: { id: tweetId, authorId },
    data: {
      text,
    },
  });
};

const deleteTweet = async (dto: TweetDeleteDto) => {
  const { tweetId, authorId } = dto;
  const tweet = await prismaClient.tweet.findUnique({
    where: { id: tweetId, authorId },
  });
  if (!tweet) throw new Error("Not Found tweet");
  try {
    await prismaClient.tweet.delete({ where: { id: tweetId, authorId } });
  } catch {
    throw new Error("can not delete tweet");
  }

  return `delete success tweet id : ${tweet.id}, ${tweet.text} `;
};

const tweetModel = {
  createTweet: writeTweet,
  updateTweet,
  deleteTweet,
  getTweets,
  getTweet,
};
export default tweetModel;
