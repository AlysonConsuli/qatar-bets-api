import { faker } from "@faker-js/faker";

import prisma from "../../src/config/db.js";
import { TeamInsertData } from "../../src/interfaces/createData.js";

export const teamBody = () => {
  const team = {
    name: faker.address.country(),
  };
  return team;
};

export const createTeam = async (team: TeamInsertData) => {
  const teamSave = await prisma.teams.create({
    data: team,
  });

  return teamSave;
};
