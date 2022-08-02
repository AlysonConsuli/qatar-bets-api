import { BetInsertData } from "../interfaces/createData.js";
import { validateHasData } from "../utils/validateData.js";
import * as appRepository from "../repositories/appRepository.js";
import * as betsRepository from "../repositories/betsRepository.js";
import { conflictError } from "../middlewares/errorHandlingMiddleware.js";

export const addBet = async (bet: BetInsertData) => {
  const { userId, gameId } = bet;
  await validateHasData(gameId, "games", "Game");
  const hasBet = await betsRepository.findBetByUserIdAndGameId(userId, gameId);
  if (hasBet) {
    throw conflictError("User has already bet on this game");
  }
  await appRepository.insertData(bet, "bets");
};
