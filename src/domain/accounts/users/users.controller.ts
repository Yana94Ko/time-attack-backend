import { Router } from "express";
import { body, validationResult } from "express-validator";
import { UserLogInDto, UserSignUpDto } from "./users.dto";
import userService from "./users.service";

const userController = Router();

userController.post(
  "/sign-up",
  body("email").isEmail().withMessage("이메일 형식으로 입력해주세요"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("비밀번호의 최소 길이는 8자 이상입니다."),
  body("nickName").isString().withMessage("닉네임을 입력하세요"),
  body("description").isString().withMessage("한줄 소개를 입력하세요"),
  async (req, res, _) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const dto: UserSignUpDto = req.body;

    res.json(await userService.signUp(dto));
  }
);

userController.post(
  "/log-in",
  body("email").isEmail().withMessage("이메일 형식으로 입력해주세요"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("비밀번호의 최소 길이는 8자 이상입니다."),
  async (req, res, _) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const dto: UserLogInDto = req.body;

    res.json(await userService.logIn(dto));
  }
);

export default userController;
