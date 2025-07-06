import { integer, jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt } from "../schema-helpers";
import { UsersTable } from "./users";
import { gameVisibilityEnum } from "./enum/game-visibility";
import { gameModeEnum } from "../schema";
import { InferSelectModel } from "drizzle-orm";
import { LetterLeagueRound } from "@/features/active-game/schemas";

export const LetterLeagueGameTable = pgTable("game", {
    id: text().primaryKey(),
    userHostId: uuid().references(() => UsersTable.id).notNull(),    
    totalRounds: integer().notNull(),
    timePerTurn: integer(),
    maxAttemptsPerRound: integer().notNull(),
    visibility: gameVisibilityEnum().notNull(),
    gameMode: gameModeEnum().notNull(),
    wordLength: integer().notNull(),    
    currentRoundIndex: integer().notNull().default(1),
    currentGuessIndex: integer().notNull().default(1),
    rounds: jsonb('rounds').$type<LetterLeagueRound[]>().notNull().default([]),
    createdAt
});
export type DbGame = InferSelectModel<typeof LetterLeagueGameTable>;