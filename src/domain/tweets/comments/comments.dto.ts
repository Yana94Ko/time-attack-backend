export type CommentWriteData = {
  content: string;
};
export type CommentWriteDto = {
  commenterId: number;
  content: string;
  tweetId: number;
};
export type CommentUpdateData = {
  content: string;
};
export type CommentUpdateDto = {
  commentId: number;
  commenterId: number;
  content: string;
  tweetId: number;
};
export type CommentDeleteDto = {
  commentId: number;
  tweetId: number;
  commenterId: number;
};
