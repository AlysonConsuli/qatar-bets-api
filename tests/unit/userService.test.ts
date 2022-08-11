import { jest } from "@jest/globals";

import { authService } from "../../src/services/authService.js";
import { authRepository } from "../../src/repositories/authRepository.js";
import { appRepository } from "../../src/repositories/appRepository.js";
import { userBody } from "../factories/userFactory.js";

describe("authService test suite", () => {
  const user = { ...userBody(), id: 1, isPaid: false };
  const { id, name, password, isPaid } = user;

  it("should create user", async () => {
    jest.spyOn(authRepository, "findUserByName").mockResolvedValueOnce(null);
    jest.spyOn(appRepository, "insertData").mockResolvedValueOnce(null);
    await authService.signup(user);
    expect(appRepository.insertData).toBeCalled();
  });

  it("given a user name equals to another, return conflict error", async () => {
    jest
      .spyOn(authRepository, "findUserByName")
      .mockResolvedValueOnce(user as any);
    const promise = authService.signup(user);
    expect(promise).rejects.toEqual({
      type: "conflict",
      message: "User already exists!",
    });
  });
});
