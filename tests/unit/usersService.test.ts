import { jest } from "@jest/globals";

import { usersService } from "../../src/services/usersService.js";
import { usersRepository } from "../../src/repositories/usersRepository.js";
import { validateData } from "../../src/utils/validateData.js";
import { userBody } from "../factories/userFactory.js";
import { betBody } from "../factories/betFactory.js";

const user = { ...userBody(), id: 1, isPaid: false, createdAt: null };
const bet = { ...betBody(), id: 1, points: null, createdAt: null };

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
