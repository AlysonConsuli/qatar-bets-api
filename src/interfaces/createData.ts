import { Users, Games, Bets } from "@prisma/client";

export type UserInsertData = Omit<Users, "id" | "createdAt" | "isPaid">;
export type BetInsertData = Omit<Bets, "id" | "createdAt" | "points">;
export type ResultInsertData = Omit<Games, "team1Id" | "team2Id" | "createdAt">;
interface PasswordConfirmation {
  passwordConfirmation: string;
}
export type SignupInsertData = UserInsertData & PasswordConfirmation;
export type AppInsertData = UserInsertData | BetInsertData | ResultInsertData;
export type Table = "users" | "bets" | "teams" | "games";
export type GroupBy = "user" | "game";
