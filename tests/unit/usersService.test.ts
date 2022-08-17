import { jest } from "@jest/globals";
import { faker } from "@faker-js/faker";

import { usersService } from "../../src/services/usersService.js";
import { usersRepository } from "../../src/repositories/usersRepository.js";
import { validateData } from "../../src/utils/validateData.js";
import { userBody } from "../factories/userFactory.js";

const user = { ...userBody(), id: 1, isPaid: false, createdAt: null };
const { id, name, isPaid } = user;

describe("postPayment test suite", () => {
  it("should post user payment", async () => {
    jest.spyOn(validateData, "validateHasData").mockResolvedValueOnce(user);
    jest.spyOn(usersRepository, "postPayment").mockResolvedValueOnce(null);
    await usersService.postPayment(user, "admin");
    expect(usersRepository.postPayment).toBeCalled();
  });

  it("given a user different from admin, return unauthorized error", async () => {
    const promise = usersService.postPayment(user, "not_admin");
    expect(promise).rejects.toEqual({
      type: "unauthorized",
      message: "Only accessed by admin",
    });
  });
});

describe("getRanking test suite", () => {
  it("should get ranking", async () => {
    const points = +faker.random.numeric(2);
    jest
      .spyOn(usersRepository, "getUsers")
      .mockResolvedValueOnce([{ id, name, isPaid: true }]);
    jest
      .spyOn(usersRepository, "getRanking")
      .mockResolvedValueOnce([{ userId: 1, _sum: { points } }]);
    const ranking = [
      {
        id,
        name,
        isPaid: true,
        points,
      },
    ];
    const getRanking = await usersService.getRanking();
    expect(getRanking).toEqual(ranking);
  });
});

describe("getUsers test suite", () => {
  it("should get all users", async () => {
    const users = [{ id, name, isPaid }];
    jest.spyOn(usersRepository, "getUsers").mockResolvedValueOnce(users);
    const getUsers = await usersService.getUsers();
    expect(getUsers).toEqual(users);
  });
});
