import { pgEnum } from "drizzle-orm/pg-core";

// Define as TypeScript enums
export enum LetterState {
  Correct = "correct",
  Wrong = "wrong",
  WrongPosition = "wrongposition",
}

// Correct way to get the enum values
export const gameVisibilityEnum = pgEnum('ll_letter_state', [
  LetterState.Correct,
  LetterState.Wrong, 
  LetterState.WrongPosition
]);