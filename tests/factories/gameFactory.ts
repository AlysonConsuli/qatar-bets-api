import { faker } from "@faker-js/faker";

import prisma from "../../src/config/db.js";
import { GameInsertData } from "../../src/interfaces/createData.js";
import { ResultInsertData } from "../../src/interfaces/createData.js";

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

export const resultBody = () => {
  const result = {
    id: 1,
    score1: 0,
    score2: 0,
  };
  return result;
};

export const addResult = async (result: ResultInsertData) => {
  const { id, score1, score2 } = result;
  const resultSave = await prisma.games.update({
    where: {
      id,
    },
    data: {
      score1,
      score2,
    },
  });

  return resultSave;
};
