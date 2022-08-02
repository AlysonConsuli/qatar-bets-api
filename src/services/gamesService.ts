import * as appRepository from "../repositories/appRepository.js";
import * as gamesRepository from "../repositories/gamesRepository.js";

export const getGames = async () => {
  return await gamesRepository.getGames();
};
