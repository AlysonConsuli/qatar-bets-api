import { Users, Teams, Games, Bets, Results } from "@prisma/client";

export type UserInsertData = Omit<Users, "id" | "createdAt">;
export type BetInsertData = Omit<Bets, "id" | "createdAt">;
export type ResultInsertData = Omit<Results, "id" | "createdAt">;
interface PasswordConfirmation {
  passwordConfirmation: string;
}
export type SignupInsertData = UserInsertData & PasswordConfirmation;
export type AppInsertData = UserInsertData | BetInsertData | ResultInsertData;
export type Table = "users" | "bets" | "results" | "teams" | "games";
