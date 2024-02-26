import { User } from "@prisma/client";

export type UserSignUpDto = {
  email: string;
  password: string;
  nickName: string;
  description: string;
};
export type UserLogInDto = {
  email: string;
  password: string;
};
export type UserUpdateData = {
  nickName: string;
  description: string;
};
export type UserUpdateDto = {
  nickName: string;
  description: string;
  currentUser: Pick<User, "id" | "email">;
};
