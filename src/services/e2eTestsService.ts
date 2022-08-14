import { e2eTestsRepository } from "../repositories/e2eTestsRepository.js";

const createGame = async () => {
  const teams = [{ name: "Qatar" }, { name: "Ecuador" }];
  const games = [{ team1Id: 1, team2Id: 2 }];
  await e2eTestsRepository.createGame(teams, games);
};

export const e2eTestsService = {
  createGame,
};
