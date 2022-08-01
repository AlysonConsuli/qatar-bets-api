import { BetInsertData } from "../interfaces/createData.js";
import { validateHasData } from "../utils/validateData.js";
import * as appRepository from "../repositories/appRepository.js";

export const addBet = async (bet: BetInsertData) => {
  //await appRepository.insertData(bet, "bets");
};
