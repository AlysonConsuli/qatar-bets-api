import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

import prisma from "../../src/config/db.js";
import { UserInsertData } from "../../src/interfaces/createData.js";

export const userBody = () => {
  const user = {
    name: faker.name.findName(),
    password: faker.random.alphaNumeric(5),
  };
  return user;
};

export const createUser = async (user: UserInsertData) => {
  const SALT = 10;
  const userSave = await prisma.users.create({
    data: {
      name: user.name,
      password: bcrypt.hashSync(user.password, SALT),
    },
  });

  return { ...userSave, plainPassword: user.password };
};
