import { boolean, integer, jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt } from "../schema-helpers";
import { UsersTable } from "./users";
import { gameVisibilityEnum } from "./enum/game-visibility";
import { gameModeEnum } from "../schema";
import { InferSelectModel } from "drizzle-orm";
import { LetterLeagueRound } from "@/features/letter-league/schemas";

export type LetterLeagueGameWord = {
    round: number;
    word: string;
}

export const LetterLeagueGameTable = pgTable("letter_league_game", {
    id: text().primaryKey(),
    userHostId: uuid().references(() => UsersTable.id).notNull(),    
    totalRounds: integer().notNull(),
    timePerTurn: integer(),
    maxAttemptsPerRound: integer().notNull(),
    words: jsonb('words').$type<LetterLeagueGameWord[]>().notNull().default([]),
    visibility: gameVisibilityEnum().notNull(),
    gameMode: gameModeEnum().notNull(),
    wordLength: integer().notNull(),
    currentRound: integer().notNull().default(1),
    currentGuess: integer().notNull().default(1),
    rounds: jsonb('rounds').$type<LetterLeagueRound[]>().notNull().default([]),
    createdAt
});
export type DbLetterLeagueGame = InferSelectModel<typeof LetterLeagueGameTable>;