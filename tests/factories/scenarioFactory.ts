import prisma from "../../src/config/db.js";

import * as gameFactory from "./gameFactory.js";
import * as teamFactory from "./teamFactory.js";

export const deleteAllData = async () => {
  await prisma.$transaction([
    prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE teams RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE games RESTART IDENTITY CASCADE`,
    prisma.$executeRaw`TRUNCATE TABLE bets RESTART IDENTITY CASCADE`,
  ]);
};

export const createScenarioTwoTeamsAndOneGame = async (
  team1 = teamFactory.teamBody(),
  team2 = teamFactory.teamBody(),
  game = gameFactory.gameBody(),
) => {
  await teamFactory.createTeam(team1);
  await teamFactory.createTeam(team2);
  const createdGame = await gameFactory.createGame(game);

  return {
    game: createdGame,
  };
};
