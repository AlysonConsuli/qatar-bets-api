import { jest } from "@jest/globals";

import { gamesService } from "../../src/services/gamesService.js";
import { gamesRepository } from "../../src/repositories/gamesRepository.js";
import { betsRepository } from "../../src/repositories/betsRepository.js";
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
const result = { ...game, score1: 1, score2: 0 };

describe("getGames test suite", () => {
  it("should get all games", async () => {
    jest
      .spyOn(gamesRepository, "getGames")
      .mockResolvedValueOnce([game] as any);
    const games = await gamesService.getGames();
    expect(gamesRepository.getGames).toBeCalled();
    expect(games).toEqual([game]);
  });
});

describe("postResult test suite", () => {
  it("given a user different from admin, return unauthorized error", async () => {
    const promise = gamesService.postResult(result, "not_admin");
    expect(promise).rejects.toEqual({
      type: "unauthorized",
      message: "Only accessed by admin",
    });
  });

  it("should post result and pass to all possibilities points", async () => {
    const bets = [
      { ...bet, score1: 0, score2: 1, user },
      { ...bet, score1: 1, score2: 0, user },
      { ...bet, score1: 2, score2: 0, user },
      { ...bet, score1: 2, score2: 1, user },
      { ...bet, score1: 1, score2: 2, user },
    ];
    jest.spyOn(validateData, "validateHasData").mockResolvedValueOnce(game);
    jest
      .spyOn(gamesRepository, "postResult")
      .mockResolvedValueOnce(result as any);
    jest
      .spyOn(betsRepository, "getBetsByGame")
      .mockResolvedValueOnce(bets as any);
    jest.spyOn(betsRepository, "postPoints").mockResolvedValueOnce(null);
    await gamesService.postResult(result, "admin");
    expect(betsRepository.postPoints).toBeCalled();
  });
});
