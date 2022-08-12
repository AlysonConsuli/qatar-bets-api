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

    await agent.post("/sign-up").send(user);
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

  it("given a wrong name, password or passwordConfirmation, receive 422", async () => {
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

afterAll(async () => {
  await prisma.$disconnect();
});
