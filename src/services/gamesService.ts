import { ResultInsertData } from "../interfaces/createData.js";
import { unauthorizedError } from "../middlewares/errorHandlingMiddleware.js";
import { validateData } from "../utils/validateData.js";
import { gamesRepository } from "../repositories/gamesRepository.js";
import { betsRepository } from "../repositories/betsRepository.js";

const getGames = async () => {
  return await gamesRepository.getGames();
};

const postResult = async (result: ResultInsertData, userName: string) => {
  const { id: gameId, score1, score2 } = result;
  if (userName !== "admin") {
    throw unauthorizedError("Only accessed by admin");
  }
  await validateData.validateHasData(gameId, "games", "Game");
  await gamesRepository.postResult(gameId, score1, score2);
  await updatePoints(result);
};

const updatePoints = async (result: ResultInsertData) => {
  const { id: gameId, score1, score2 } = result;
  const bets = await betsRepository.getBetsByGame(gameId);
  for (let i = 0; i < bets.length; i++) {
    const bet = bets[i];
    const userId = bet.user.id;

    const gameResult = Math.sign(score1 - score2);
    const betResult = Math.sign(bet.score1 - bet.score2);
    let points = 0;
    if (bet.score1 === score1 && bet.score2 === score2) {
      points = 10;
    } else if (
      gameResult === betResult &&
      (bet.score1 === score1 || bet.score2 === score2)
    ) {
      points = 7;
    } else if (gameResult === betResult) {
      points = 5;
    } else if (bet.score1 === score1 || bet.score2 === score2) {
      points = 2;
    }
    await betsRepository.postPoints(gameId, userId, points);
  }
};

export const gamesService = {
  getGames,
  postResult,
};
