import { jest } from "@jest/globals";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { authService } from "../../src/services/authService.js";
import { authRepository } from "../../src/repositories/authRepository.js";
import { appRepository } from "../../src/repositories/appRepository.js";
import { userBody } from "../factories/userFactory.js";

const user = { ...userBody(), id: 1, isPaid: false, createdAt: null };
const { id, name, password, isPaid } = user;

describe("signup test suite", () => {
  it("should create user", async () => {
    jest.spyOn(authRepository, "findUserByName").mockResolvedValueOnce(null);
    jest.spyOn(appRepository, "insertData").mockResolvedValueOnce(null);
    await authService.signup({ ...user, name: `o ${name}` });
    expect(appRepository.insertData).toBeCalled();
  });

  it("given a user name equals to another, return conflict error", async () => {
    jest.spyOn(authRepository, "findUserByName").mockResolvedValueOnce(user);
    const promise = authService.signup(user);
    expect(promise).rejects.toEqual({
      type: "conflict",
      message: "User already exists!",
    });
  });
});

describe("signin test suite", () => {
  it("should signin and receive a token", async () => {
    const SALT = 10;
    const hashedPassword = bcrypt.hashSync(password, SALT);
    jest
      .spyOn(authRepository, "findUserByName")
      .mockResolvedValueOnce({ ...user, password: hashedPassword });
    jest.spyOn(jwt, "sign").mockReturnValueOnce("my_token");
    const token = await authService.signin(user);
    expect(token).toEqual("my_token");
  });

  it("given a user that doesnt exist, return not found error", async () => {
    jest.spyOn(authRepository, "findUserByName").mockResolvedValueOnce(null);
    const promise = authService.signin(user);
    expect(promise).rejects.toEqual({
      type: "notFound",
      message: "User not found!",
    });
  });

  it("given a incorrect password, return unauthorized error", async () => {
    jest
      .spyOn(authRepository, "findUserByName")
      .mockResolvedValueOnce({ ...user, password: "wrong password" });
    const promise = authService.signin(user);
    expect(promise).rejects.toEqual({
      type: "unauthorized",
      message: "Incorrect password!",
    });
  });
});

describe("adminlogin test suite", () => {
  it("should return unauthorized error if user are different from admin", async () => {
    const userName = user.name;
    const promise = authService.adminlogin(userName);
    expect(promise).rejects.toEqual({
      type: "unauthorized",
      message: "Only accessed by admin",
    });
  });
});
