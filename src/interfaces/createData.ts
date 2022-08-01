import { Users, Games, Bets } from "@prisma/client";

export type UserInsertData = Omit<Users, "id" | "createdAt" | "isPaid">;
export type BetInsertData = Omit<Bets, "id" | "createdAt" | "points">;
export type GameInsertData = Omit<Games, "id" | "createdAt">;
interface PasswordConfirmation {
  passwordConfirmation: string;
}
export type SignupInsertData = UserInsertData & PasswordConfirmation;
export type AppInsertData = UserInsertData | BetInsertData | GameInsertData;
export type Table = "users" | "bets" | "teams" | "games";
