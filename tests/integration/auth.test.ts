import { faker } from "@faker-js/faker";
import supertest from "supertest";

import app from "../../src/app.js";
import prisma from "../../src/config/db.js";
import { deleteAllData } from "../factories/scenarioFactory.js";
import * as userFactory from "../factories/userFactory.js";

beforeEach(async () => {
  await deleteAllData();
});

const agent = supertest(app);

describe("signup test suite", () => {
  it("should create user", async () => {
    const user = userFactory.userBody();
    const passwordConfirmation = user.password;

    await agent.post("/sign-up").send({ ...user, passwordConfirmation });
    const userCreated = await prisma.users.findFirst({
      where: { name: user.name },
    });

    expect(userCreated).not.toBeNull();
  });

  it("given an user with same name that other, receive 409", async () => {
    const user = userFactory.userBody();
    await userFactory.createUser(user);

    const response = await agent.post("/sign-up").send(user);
    expect(response.status).toBe(409);
  });

  it("given invalid data, receive 422", async () => {
    const user = userFactory.userBody();

    let response = await agent.post("/sign-up").send({ ...user, name: 0 });
    expect(response.status).toBe(422);

    response = await agent.post("/sign-up").send({ ...user, password: "123" });
    expect(response.status).toBe(422);

    response = await agent
      .post("/sign-up")
      .send({ ...user, password: "1234", passwordConfirmation: "12345" });
    expect(response.status).toBe(422);
  });
});

describe("signin test suite", () => {
  it("should login user", async () => {
    const user = userFactory.userBody();
    await userFactory.createUser(user);

    const response = await agent.post("/sign-in").send(user);
    const { token } = response.body;
    expect(token).not.toBeNull();
  });

  it("given an user that doenst exist, receive 404", async () => {
    const user = userFactory.userBody();

    const response = await agent.post("/sign-in").send(user);
    expect(response.status).toBe(404);
  });

  it("given wrong password, receive 401", async () => {
    const user = userFactory.userBody();
    await userFactory.createUser(user);

    const response = await agent
      .post("/sign-in")
      .send({ ...user, password: "wrong_password" });
    expect(response.status).toBe(401);
  });

  it("given invalid data, receive 422", async () => {
    const user = userFactory.userBody();

    let response = await agent.post("/sign-in").send({ ...user, name: 0 });
    expect(response.status).toBe(422);

    response = await agent.post("/sign-in").send({ ...user, password: "123" });
    expect(response.status).toBe(422);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
