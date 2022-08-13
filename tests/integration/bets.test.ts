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

    await agent.post("/bet").set("Authorization", `Bearer ${token}`).send(bet);
    const betCreated = await prisma.bets.findFirst({
      where: { id: 1 },
    });

    expect(betCreated).not.toBeNull();
  });

  it("given a game that doenst exist, receive 404", async () => {
    await scenarioFactory.createScenarioTwoTeamsAndOneGame();
    const token = await tokenFactory.createToken();
    const bet = betFactory.betBody();

    const response = await agent
      .post("/bet")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...bet, gameId: 100 });
    expect(response.status).toBe(404);
  });

  it("given an user that doenst exist, receive 404", async () => {
    await scenarioFactory.createScenarioTwoTeamsAndOneGame();
    const token = await tokenFactory.createJustToken();
    const bet = betFactory.betBody();

    const response = await agent
      .post("/bet")
      .set("Authorization", `Bearer ${token}`)
      .send(bet);
    expect(response.status).toBe(404);
  });

  it("given an user that doenst paid, receive 401", async () => {
    await scenarioFactory.createScenarioTwoTeamsAndOneGame();
    const token = await tokenFactory.createTokenNotPaid();
    const bet = betFactory.betBody();

    const response = await agent
      .post("/bet")
      .set("Authorization", `Bearer ${token}`)
      .send(bet);
    expect(response.status).toBe(401);
  });

  it("should update bet", async () => {
    await scenarioFactory.createScenarioTwoTeamsAndOneGame();
    const token = await tokenFactory.createToken();
    const bet = betFactory.betBody();
    await betFactory.createBet({ ...bet, userId: 1 });

    await agent
      .post("/bet")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...bet, score1: 10 });
    const betUpdated = await prisma.bets.findFirst({
      where: { id: 1 },
    });
    expect(betUpdated.score1).toBe(10);
  });

  it("given invalid data, receive 422", async () => {
    await scenarioFactory.createScenarioTwoTeamsAndOneGame();
    const token = await tokenFactory.createToken();
    const bet = betFactory.betBody();

    let response = await agent
      .post("/bet")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...bet, gameId: 0 });
    expect(response.status).toBe(422);

    response = await agent
      .post("/bet")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...bet, score1: -1 });
    expect(response.status).toBe(422);

    response = await agent
      .post("/bet")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...bet, score2: -1 });
    expect(response.status).toBe(422);
  });
});

describe("getBets test suite", () => {
  it("should get all bets", async () => {
    const scenario = await scenarioFactory.createScenarioTwoTeamsAndOneGame();
    const token = await tokenFactory.createToken();
    await betFactory.createBet();

    const response = await agent
      .get("/bets")
      .set("Authorization", `Bearer ${token}`);
    const { bets } = response.body;
    expect(bets.length).toBe(1);
    expect(bets[0].game.id).toBe(scenario.game.id);
  });

  it("should get all user bets", async () => {
    await scenarioFactory.createScenarioTwoTeamsAndOneGame();
    const token = await tokenFactory.createToken();
    await betFactory.createBet();

    await tokenFactory.createToken();
    const bet = { ...betFactory.betBody(), userId: 2 };
    await betFactory.createBet(bet);

    const response = await agent
      .get("/bets?groupBy=user")
      .set("Authorization", `Bearer ${token}`);
    const { bets } = response.body;
    expect(bets.length).toBe(1);
    expect(bets[0].user.id).toBe(1);
  });
});

describe("getBetsByUser test suite", () => {
  it("should get bets from a specific user", async () => {
    const scenario = await scenarioFactory.createScenarioTwoTeamsAndOneGame();
    const token = await tokenFactory.createToken();
    await betFactory.createBet();

    const response = await agent
      .get("/bets/user/1")
      .set("Authorization", `Bearer ${token}`);
    const { bets } = response.body;
    expect(bets.length).toBe(1);
    expect(bets[0].game.id).toBe(scenario.game.id);
  });

  it("given invalid params, receive 422", async () => {
    await scenarioFactory.createScenarioTwoTeamsAndOneGame();
    const token = await tokenFactory.createToken();
    await betFactory.createBet();

    const response = await agent
      .get("/bets/user/0")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(422);
  });

  it("given a user that doenst exist, receive 404", async () => {
    await scenarioFactory.createScenarioTwoTeamsAndOneGame();
    const token = await tokenFactory.createToken();
    await betFactory.createBet();

    const response = await agent
      .get("/bets/user/100")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
  });
});

describe("getBetsByGame test suite", () => {
  it("should get bets from a game", async () => {
    const scenario = await scenarioFactory.createScenarioTwoTeamsAndOneGame();
    const token = await tokenFactory.createToken();
    await betFactory.createBet();

    const response = await agent
      .get("/bets/game/1")
      .set("Authorization", `Bearer ${token}`);
    const { bets } = response.body;
    expect(bets.length).toBe(1);
    expect(bets[0].game.id).toBe(scenario.game.id);
  });

  it("given invalid params, receive 422", async () => {
    await scenarioFactory.createScenarioTwoTeamsAndOneGame();
    const token = await tokenFactory.createToken();
    await betFactory.createBet();

    const response = await agent
      .get("/bets/game/0")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(422);
  });

  it("given a game that doenst exist, receive 404", async () => {
    await scenarioFactory.createScenarioTwoTeamsAndOneGame();
    const token = await tokenFactory.createToken();
    await betFactory.createBet();

    const response = await agent
      .get("/bets/game/100")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(404);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
