import { jest } from "@jest/globals";

import { authService } from "../../src/services/authService.js";
import { authRepository } from "../../src/repositories/authRepository.js";
import { appRepository } from "../../src/repositories/appRepository.js";
import { userBody } from "../factories/userFactory.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const user = { ...userBody(), id: 1, isPaid: false, createdAt: null };
const { id, name, password, isPaid } = user;

describe("signup test suite", () => {
  it("should create user", async () => {
    jest.spyOn(authRepository, "findUserByName").mockResolvedValueOnce(null);
    jest.spyOn(appRepository, "insertData").mockResolvedValueOnce(null);
    await authService.signup(user);
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
    jest.spyOn(authRepository, "findUserByName").mockResolvedValueOnce(user);
    jest.spyOn(bcrypt, "compareSync").mockReturnValueOnce(true);
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
    jest.spyOn(authRepository, "findUserByName").mockResolvedValueOnce(user);
    jest.spyOn(bcrypt, "compareSync").mockReturnValueOnce(false);
    const promise = authService.signin(user);
    expect(promise).rejects.toEqual({
      type: "unauthorized",
      message: "Incorrect password!",
    });
  });
});
