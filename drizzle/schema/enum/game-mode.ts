import { pgEnum } from "drizzle-orm/pg-core";

export enum GameMode {
  Solo = "solo",
  Multiplayer = "mp",
  WordOfTheDay = "wod"
}
export const gameModeEnum = pgEnum('game_mode', [
  GameMode.Solo,
  GameMode.Multiplayer, 
  GameMode.WordOfTheDay
]);