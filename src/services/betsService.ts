import { BetInsertData, GroupBy } from "../interfaces/createData.js";
import { validateHasData } from "../utils/validateData.js";
import * as betsRepository from "../repositories/betsRepository.js";
import { unprocessableEntityError } from "../middlewares/errorHandlingMiddleware.js";

export const addBet = async (bet: BetInsertData) => {
  const { userId, gameId } = bet;
  await validateHasData(gameId, "games", "Game");
  const hasBet = await betsRepository.findBetByUserIdAndGameId(userId, gameId);
  const betId = hasBet?.id ? hasBet.id : 0;
  await betsRepository.upsertBet(bet, betId);
};

export const getBets = async (groupBy: GroupBy, userId: number) => {
  if (groupBy === "user") {
    return await betsRepository.getUsersBets(userId);
  }
  return await betsRepository.getBets();
};

export const getBetsByUser = async (userId: number) => {
  if (!userId || userId <= 0) {
    throw unprocessableEntityError("userId must be an integer bigger than 0");
  }
  await validateHasData(userId, "users", "User");
  return await betsRepository.getUsersBets(userId);
};

export const getBetsByGame = async (gameId: number) => {
  if (!gameId || gameId <= 0) {
    throw unprocessableEntityError("gameId must be an integer bigger than 0");
  }
  await validateHasData(gameId, "games", "Game");
  return await betsRepository.getBetsByGame(gameId);
};
