import prisma from "../config/db.js";

import { AppInsertData, Table } from "../interfaces/createData.js";

const findDataById = async (id: number, table: Table) => {
  return await prisma[table as any].findFirst({
    where: {
      id,
    },
  });
};

const insertData = async (data: AppInsertData, table: Table) => {
  await prisma[table as any].create({
    data,
  });
};

export const appRepository = {
  findDataById,
  insertData,
};
