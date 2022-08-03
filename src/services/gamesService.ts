import { ResultInsertData } from "../interfaces/createData.js";
import { unauthorizedError } from "../middlewares/errorHandlingMiddleware.js";
import * as gamesRepository from "../repositories/gamesRepository.js";
import { validateHasData } from "../utils/validateData.js";

export const getGames = async () => {
  return await gamesRepository.getGames();
};

export const postResult = async (
  result: ResultInsertData,
  userName: string,
) => {
  const { id: gameId, score1, score2 } = result;
  if (userName !== "admin") {
    throw unauthorizedError("Only accessed by admin");
  }
  await validateHasData(gameId, "games", "Game");
  await gamesRepository.postResult(gameId, score1, score2);
};
