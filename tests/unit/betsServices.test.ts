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
});
