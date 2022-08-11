import { faker } from "@faker-js/faker";

import prisma from "../../src/config/db.js";
import { GameInsertData } from "../../src/interfaces/createData.js";

export const gameBody = () => {
  const game = {
    team1Id: 1,
    team2Id: 2,
    score1: null,
    score2: null,
  };
  return game;
};

export const creategame = async (game: GameInsertData) => {
  const gameSave = await prisma.games.create({
    data: game,
  });

  return gameSave;
};
