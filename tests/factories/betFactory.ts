import { faker } from "@faker-js/faker";

import prisma from "../../src/config/db.js";
import { BetInsertData } from "../../src/interfaces/createData.js";

export const betBody = () => {
  const bet = {
    gameId: 1,
    score1: +faker.random.numeric(1),
    score2: +faker.random.numeric(1),
  };
  return bet;
};

export const createBet = async (
  bet: BetInsertData = { ...betBody(), userId: 1 },
) => {
  const betSave = await prisma.bets.create({
    data: bet,
  });

  return betSave;
};
