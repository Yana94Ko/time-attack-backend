import { User } from "@prisma/client";
import {
  CommentDeleteDto,
  CommentUpdateData,
  CommentUpdateDto,
  CommentWriteData,
  CommentWriteDto,
} from "./comments.dto";
import commentsModel from "./comments.model";

const writeComment = async (
  tweetId: number,
  data: CommentWriteData,
  user: Pick<User, "id" | "email">
) => {
  const dto: CommentWriteDto = { ...data, commenterId: user.id, tweetId };
  return await commentsModel.writeComment(dto);
};

const updateComment = async (
  tweetId: number,
  commentId: number,
  data: CommentUpdateData,
  user: Pick<User, "id" | "email">
) => {
  const dto: CommentUpdateDto = {
    ...data,
    commenterId: user.id,
    tweetId,
    commentId,
  };

  return await commentsModel.updateComment(dto);
};

const deleteComment = async (
  commentId: number,
  tweetId: number,
  user: Pick<User, "id" | "email">
) => {
  const dto: CommentDeleteDto = { commentId, tweetId, commenterId: user.id };

  return await commentsModel.deleteComment(dto);
};

const getComment = (commentId: number) => {
  return commentsModel.getComment(commentId);
};

const getComments = () => {
  return commentsModel.getComments();
};

const commentsService = {
  writeComment,
  updateComment,
  deleteComment,
  getComment,
  getComments,
};
export default commentsService;
