import { jest } from "@jest/globals";

import { betsService } from "../../src/services/betsService.js";
import { betsRepository } from "../../src/repositories/betsRepository.js";
import { appRepository } from "../../src/repositories/appRepository.js";
import { validateData } from "../../src/utils/validateData.js";
import { betBody } from "../factories/betFactory.js";
import { userBody } from "../factories/userFactory.js";
import { gameBody } from "../factories/gameFactory.js";

const bet = { ...betBody(), id: 1, points: null, createdAt: null };
const user = { ...userBody(), id: 1, isPaid: true, createdAt: null };
const game = { ...gameBody(), id: 1, createdAt: null };

describe("addBet test suite", () => {
  it("should create bet", async () => {
    jest.spyOn(validateData, "validateHasData").mockResolvedValueOnce(game);
    jest.spyOn(appRepository, "findDataById").mockResolvedValueOnce(user);
    jest
      .spyOn(betsRepository, "findBetByUserIdAndGameId")
      .mockResolvedValueOnce(null);
    jest.spyOn(betsRepository, "upsertBet").mockResolvedValueOnce(null);
    await betsService.addBet(bet);
    expect(betsRepository.upsertBet).toBeCalled();
  });

  it("given a user that doesnt exist, return not found error", async () => {
    jest.spyOn(validateData, "validateHasData").mockResolvedValueOnce(game);
    jest.spyOn(appRepository, "findDataById").mockResolvedValueOnce(null);
    const promise = betsService.addBet(bet);
    expect(promise).rejects.toEqual({
      type: "notFound",
      message: "User not found",
    });
  });

  it("given a user that doesnt have paid, return unauthorized error", async () => {
    jest.spyOn(validateData, "validateHasData").mockResolvedValueOnce(game);
    jest
      .spyOn(appRepository, "findDataById")
      .mockResolvedValueOnce({ ...user, isPaid: false });
    const promise = betsService.addBet(bet);
    expect(promise).rejects.toEqual({
      type: "unauthorized",
      message: "You need to pay admin to add bets",
    });
  });
});

describe("getBets test suite", () => {
  it("should get all bets", async () => {
    const groupBy = "" as any;
    jest.spyOn(betsRepository, "getBets").mockResolvedValueOnce([bet] as any);
    const bets = await betsService.getBets(groupBy, user.id);
    expect(betsRepository.getBets).toBeCalled();
    expect(bets).toEqual([bet]);
  });

  it("should get all bets from the user", async () => {
    const groupBy = "user";
    jest
      .spyOn(betsRepository, "getUsersBets")
      .mockResolvedValueOnce([bet] as any);
    const bets = await betsService.getBets(groupBy, user.id);
    expect(betsRepository.getUsersBets).toBeCalled();
    expect(bets).toEqual([bet]);
  });
});
