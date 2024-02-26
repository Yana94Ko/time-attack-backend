export type TweetCreateData = {
  text: string;
};
export type TweetCreateDto = {
  text: string;
  authorId: number;
};
export type TweetUpdateData = {
  text: string;
};
export type TweetUpdateDto = {
  tweetId: number;
  text: string;
  authorId: number;
};
export type TweetDeleteDto = {
  tweetId: number;
  authorId: number;
};
