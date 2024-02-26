import { User } from "@prisma/client";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import prismaClient from "../../../db/prisma/client.prisma";

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

const userModel = {
  findByEmail,
  verifyPassword,
  createAccessToken,
  getUserByAccessToken,
};
export default userModel;
