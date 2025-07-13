import { integer, jsonb, pgTable, text, unique } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { GameTable } from "./game";
import { ValidatedLetter, ValidatedWord, Word } from "@/features/word/word-models";
import { id } from "../schema-helpers";

export const GameRoundTable = pgTable("game_round", {
    id,
    gameId: text().references(() => GameTable.id, { onDelete: 'cascade' }).notNull(),
    roundNumber: integer().notNull(),
    currentGuessIndex: integer().notNull().default(1),
    word: jsonb('word').$type<Word>().notNull(),
    guesses: jsonb('guesses').$type<ValidatedWord[]>().notNull().default([]),
    guessedLetters: jsonb('guessed_letters').$type<ValidatedLetter[]>().notNull().default([]),
}, (t) => [
  unique().on(t.gameId, t.roundNumber)
]);

export type DbGameRound = InferSelectModel<typeof GameRoundTable>;

export const gameRoundRelations = relations(GameRoundTable, ({ one }) => ({
  game: one(GameTable, {
    fields: [GameRoundTable.gameId],
    references: [GameTable.id]
  })
}));