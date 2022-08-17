import { jest } from "@jest/globals";

import { betsService } from "../../src/services/betsService.js";
import { betsRepository } from "../../src/repositories/betsRepository.js";
import { appRepository } from "../../src/repositories/appRepository.js";
import { validateData } from "../../src/utils/validateData.js";
import { betBody } from "../factories/betFactory.js";
import { userBody } from "../factories/userFactory.js";
import { gameBody } from "../factories/gameFactory.js";

const user = { ...userBody(), id: 1, isPaid: true, createdAt: null };
const bet = {
  ...betBody(),
  id: 1,
  userId: user.id,
  points: null,
  createdAt: null,
};
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

  it("should update bet", async () => {
    jest.spyOn(validateData, "validateHasData").mockResolvedValueOnce(game);
    jest.spyOn(appRepository, "findDataById").mockResolvedValueOnce(user);
    jest
      .spyOn(betsRepository, "findBetByUserIdAndGameId")
      .mockResolvedValueOnce(bet);
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

  it("given a bet to a game that has result, return unauthorized error", async () => {
    jest
      .spyOn(validateData, "validateHasData")
      .mockResolvedValueOnce({ ...game, score1: 1, score2: 0 });
    jest.spyOn(appRepository, "findDataById").mockResolvedValueOnce(user);
    const promise = betsService.addBet(bet);
    expect(promise).rejects.toEqual({
      type: "unauthorized",
      message: "Betting time ended for this game",
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

describe("getBetsByUser test suite", () => {
  it("should get all bets from an especific user", async () => {
    jest.spyOn(validateData, "validateHasData").mockResolvedValueOnce(user);
    jest
      .spyOn(betsRepository, "getUsersBets")
      .mockResolvedValueOnce([bet] as any);
    const bets = await betsService.getBetsByUser(user.id);
    expect(betsRepository.getUsersBets).toBeCalled();
    expect(bets).toEqual([bet]);
  });

  it("given a userId less or equal to 0, return unprocessable entity error", async () => {
    const promise = betsService.getBetsByUser(-1);
    expect(promise).rejects.toEqual({
      type: "unprocessableEntity",
      message: "userId must be an integer bigger than 0",
    });
  });
});

describe("getBetsByGame test suite", () => {
  it("should get all bets from an especific game", async () => {
    jest.spyOn(validateData, "validateHasData").mockResolvedValueOnce(game);
    jest
      .spyOn(betsRepository, "getBetsByGame")
      .mockResolvedValueOnce([bet] as any);
    const bets = await betsService.getBetsByGame(game.id);
    expect(betsRepository.getBetsByGame).toBeCalled();
    expect(bets).toEqual([bet]);
  });

  it("given a gameId less or equal to 0, return unprocessable entity error", async () => {
    const promise = betsService.getBetsByGame(-1);
    expect(promise).rejects.toEqual({
      type: "unprocessableEntity",
      message: "gameId must be an integer bigger than 0",
    });
  });
});

describe("validateData test suite", () => {
  it("should return data", async () => {
    jest.spyOn(appRepository, "findDataById").mockResolvedValueOnce(bet);
    const data = await validateData.validateHasData(bet.id, "bets", "Bet");
    expect(data).toEqual(bet);
  });

  it("given a gameId less or equal to 0, return unprocessable entity error", async () => {
    const tableTitle = "Bet";
    jest.spyOn(appRepository, "findDataById").mockResolvedValueOnce(null);
    const promise = validateData.validateHasData(-1, "bets", tableTitle);
    expect(promise).rejects.toEqual({
      type: "notFound",
      message: `${tableTitle} not found!`,
    });
  });
});
