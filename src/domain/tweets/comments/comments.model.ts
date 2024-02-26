import prismaClient from "../../../db/prisma/client.prisma";
import {
  CommentDeleteDto,
  CommentUpdateDto,
  CommentWriteDto,
} from "./comments.dto";

const writeComment = async (dto: CommentWriteDto) => {
  const { commenterId, content, tweetId } = dto;
  return await prismaClient.comment.create({
    data: { commenterId, content, tweetId },
  });
};

const updateComment = async (dto: CommentUpdateDto) => {
  const { commentId, commenterId, content, tweetId } = dto;

  const comment = await prismaClient.comment.update({
    where: {
      id: commentId,
      tweetId,
      commenterId,
    },
    data: {
      content,
    },
  });

  if (!comment) throw new Error("can not update comment");

  return comment;
};

const deleteComment = async (dto: CommentDeleteDto) => {
  const { commentId, tweetId, commenterId } = dto;
  try {
    await prismaClient.comment.delete({
      where: {
        id: commentId,
        tweetId,
        commenterId,
      },
    });
  } catch {
    throw new Error("can not delete comment");
  }
  return `delete success - commentId : ${commentId} `;
};

const getComment = async (id: number) => {
  return prismaClient.comment.findUnique({ where: { id } });
};

const getComments = () => {
  return prismaClient.comment.findMany();
};

const commentsModel = {
  writeComment,
  updateComment,
  deleteComment,
  getComment,
  getComments,
};
export default commentsModel;
