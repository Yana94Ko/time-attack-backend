import { User } from "@prisma/client";
import { hash } from "bcrypt";
import prismaClient from "../../../db/prisma/client.prisma";
import {
  UserLogInDto,
  UserSignUpDto,
  UserUpdateData,
  UserUpdateDto,
} from "./users.dto";
import userModel from "./users.model";

const signUp = async (dto: UserSignUpDto) => {
  const { email, password, nickName, description } = dto;

  const user = await prismaClient.user.findUnique({ where: { email } });
  if (user) throw new Error("Email duplicated");

  const encryptedPassword = await hash(password, 12);

  return await prismaClient.user.create({
    data: {
      email,
      encryptedPassword,
      profile: {
        create: {
          nickName,
          description,
        },
      },
    },
    select: { email: true, createdAt: true },
  });
};

const logIn = async (dto: UserLogInDto) => {
  const { email, password } = dto;
  const user = await userModel.findByEmail(email);
  if (!user) throw new Error("User not found");

  const isVerified = await userModel.verifyPassword(
    password,
    user.encryptedPassword
  );
  if (!isVerified) throw new Error("Invalid password");

  return await userModel.createAccessToken(user);
};

const updateUserProfile = async (
  data: UserUpdateData,
  user: Pick<User, "id" | "email">
) => {
  const dto: UserUpdateDto = { ...data, currentUser: user };
  return await userModel.updateUserProfile(dto);
};
const getUser = (userId: number) => {
  return userModel.getUser(userId);
};

const userService = { signUp, logIn, updateUserProfile, getUser };

export default userService;
