import { jest } from "@jest/globals";

import { gamesService } from "../../src/services/gamesService.js";
import { gamesRepository } from "../../src/repositories/gamesRepository.js";
import { appRepository } from "../../src/repositories/appRepository.js";
import { validateData } from "../../src/utils/validateData.js";
import { betBody } from "../factories/betFactory.js";
import { userBody } from "../factories/userFactory.js";
import { gameBody } from "../factories/gameFactory.js";

const bet = { ...betBody(), id: 1, points: null, createdAt: null };
const user = { ...userBody(), id: 1, isPaid: true, createdAt: null };
const game = { ...gameBody(), id: 1, createdAt: null };
const result = { ...gameBody(), id: 1, score1: 0, score2: 0, createdAt: null };

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
