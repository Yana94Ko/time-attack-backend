import { hash } from "bcrypt";
import prismaClient from "../../../db/prisma/client.prisma";
import { UserLogInDto, UserSignUpDto } from "./users.dto";
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

const userService = { signUp, logIn };

export default userService;
