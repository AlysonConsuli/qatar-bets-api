import { BetInsertData, GroupBy } from "../interfaces/createData.js";
import { validateData } from "../utils/validateData.js";
import { betsRepository } from "../repositories/betsRepository.js";
import { appRepository } from "../repositories/appRepository.js";
import {
  notFoundError,
  unauthorizedError,
  unprocessableEntityError,
} from "../middlewares/errorHandlingMiddleware.js";

const addBet = async (bet: BetInsertData) => {
  const { userId, gameId } = bet;
  await validateData.validateHasData(gameId, "games", "Game");
  const user = await appRepository.findDataById(userId, "users");
  if (!user) {
    throw notFoundError("User not found");
  }
  if (!user?.isPaid) {
    throw unauthorizedError("You need to pay admin to add bets");
  }
  const hasBet = await betsRepository.findBetByUserIdAndGameId(userId, gameId);
  const betId = hasBet?.id ? hasBet.id : 0;
  await betsRepository.upsertBet(bet, betId);
};

const getBets = async (groupBy: GroupBy, userId: number) => {
  if (groupBy === "user") {
    return await betsRepository.getUsersBets(userId);
  }
  return await betsRepository.getBets();
};

const getBetsByUser = async (userId: number) => {
  if (!userId || userId <= 0) {
    throw unprocessableEntityError("userId must be an integer bigger than 0");
  }
  await validateData.validateHasData(userId, "users", "User");
  return await betsRepository.getUsersBets(userId);
};

const getBetsByGame = async (gameId: number) => {
  if (!gameId || gameId <= 0) {
    throw unprocessableEntityError("gameId must be an integer bigger than 0");
  }
  await validateData.validateHasData(gameId, "games", "Game");
  return await betsRepository.getBetsByGame(gameId);
};

export const betsService = {
  addBet,
  getBets,
  getBetsByUser,
  getBetsByGame,
};
