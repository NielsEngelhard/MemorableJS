import { integer, jsonb, pgTable, text } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { ValidatedLetter, ValidatedWord } from "./model/letter-league-models";
import { GameTable } from "./game";

export const GameRoundTable = pgTable("game_round", {
    gameId: text().references(() => GameTable.id).notNull().primaryKey(),
    roundNumber: integer().notNull().primaryKey(),
    word: text().notNull(),
    guesses: jsonb('guesses').$type<ValidatedWord[]>().notNull().default([]),
    guessedLetters: jsonb('guessed_letters').$type<ValidatedLetter[]>().notNull().default([]),
});

export type DbGameRound = InferSelectModel<typeof GameRoundTable>;

export const gameRoundRelations = relations(GameRoundTable, ({ one }) => ({
  game: one(GameTable, {
    fields: [GameRoundTable.gameId],
    references: [GameTable.id]
  })
}));