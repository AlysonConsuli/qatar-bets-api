import supertest from "supertest";

import app from "../../src/app.js";
import prisma from "../../src/config/db.js";
import { deleteAllData } from "../factories/scenarioFactory.js";
import * as tokenFactory from "../factories/tokenFactory.js";
import * as betFactory from "../factories/betFactory.js";
import * as scenarioFactory from "../factories/scenarioFactory.js";

beforeEach(async () => {
  await deleteAllData();
});

const agent = supertest(app);

describe("addBet test suite", () => {
  it("should create bet", async () => {
    await scenarioFactory.createScenarioTwoTeamsAndOneGame();
    const token = await tokenFactory.createToken();
    const bet = betFactory.betBody();

    const res = await agent
      .post("/bet")
      .set("Authorization", `Bearer ${token}`)
      .send(bet);
    const betCreated = await prisma.bets.findFirst({
      where: { id: 1 },
    });

    expect(betCreated).not.toBeNull();
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
