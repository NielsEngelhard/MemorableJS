import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt } from "../schema-helpers";
import { UsersTable } from "./users";
import { gameVisibilityEnum } from "./enum/game-visibility";
import { gameModeEnum } from "../schema";
import { InferSelectModel, relations } from "drizzle-orm";
import { DbGameRound, GameRoundTable } from "./game-round";
import { DbGamePlayer, GamePlayerTable } from "./game-player";

export const GameTable = pgTable("game", {
    id: text().primaryKey(),
    userHostId: uuid().references(() => UsersTable.id).notNull(),    
    totalRounds: integer().notNull(),
    timePerTurn: integer(),
    maxAttemptsPerRound: integer().notNull(),
    visibility: gameVisibilityEnum().notNull(),
    gameMode: gameModeEnum().notNull(),
    wordLength: integer().notNull(),    
    currentRoundIndex: integer().notNull().default(1),
    createdAt
});
export type DbGame = InferSelectModel<typeof GameTable>;

export type DbGameWithRoundsAndPlayers = DbGame & {
  rounds: DbGameRound[];
  players: DbGamePlayer[];
};

export const gameRelations = relations(GameTable, ({ many }) => ({
  rounds: many(GameRoundTable),
  players: many(GamePlayerTable)
}));