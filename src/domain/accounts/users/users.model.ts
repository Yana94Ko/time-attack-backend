import { Prisma, User } from "@prisma/client";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import prismaClient from "../../../db/prisma/client.prisma";
import { UserUpdateDto } from "./users.dto";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET_KEY) throw new Error("JWT_SECRET_KEY NotFound");

const findByEmail = async (email: string) => {
  return await prismaClient.user.findUnique({ where: { email } });
};

const findById = async (id: number) => {
  return await prismaClient.user.findUnique({ where: { id } });
};

const verifyPassword = async (password: string, encryptedPassword: string) => {
  return compare(password, encryptedPassword);
};

const createAccessToken = async (user: Pick<User, "id" | "email">) => {
  const { id, email } = user;
  const accessToken = jwt.sign({ email }, JWT_SECRET_KEY, {
    subject: String(id),
    expiresIn: "2h",
  });
  return accessToken;
};
const getUserByAccessToken = async (accessToken: string) => {
  const { sub: id } = jwt.verify(accessToken, JWT_SECRET_KEY);
  return await findById(Number(id));
};
const updateUserProfile = async (dto: UserUpdateDto) => {
  const existingUser = await prismaClient.profile.findUnique({
    where: {
      userId: dto.currentUser.id,
    },
  });
  if (!existingUser) throw new Error("User Not Found");

  const data: Prisma.ProfileUncheckedUpdateInput = {
    nickName: dto.nickName ? dto.nickName : existingUser.nickName,
    description: dto.description ? dto.description : existingUser.description,
  };
  return await prismaClient.profile.update({
    where: { userId: dto.currentUser.id },
    data,
  });
};

const getUser = (id: number) => {
  return prismaClient.user.findUnique({
    where: { id },
    include: {
      tweet: { orderBy: { createdAt: "desc" } },
      profile: {
        select: { nickName: true, followersCount: true, followingCount: true },
      },
    },
  });
};

const userModel = {
  findByEmail,
  verifyPassword,
  createAccessToken,
  getUserByAccessToken,
  updateUserProfile,
  getUser,
};
export default userModel;
