import { notFoundError } from "../middlewares/errorHandlingMiddleware.js";
import { AppInsertData, Table } from "../interfaces/createData.js";
import { appRepository } from "../repositories/appRepository.js";

const validateHasData = async (
  id: number,
  table: Table,
  tableTitle: string,
) => {
  const data = (await appRepository.findDataById(id, table)) as AppInsertData;
  if (!data) {
    throw notFoundError(`${tableTitle} not found!`);
  }
  return data;
};

export const validateData = {
  validateHasData,
};
