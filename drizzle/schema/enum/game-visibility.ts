import { pgEnum } from "drizzle-orm/pg-core";

// Define as TypeScript enums
export enum GameVisibility {
  Private = "private",
  Public = "public",
  FriendsOnly = "friends-only"
}

// Correct way to get the enum values
export const gameVisibilityEnum = pgEnum('game_visibility', [
  GameVisibility.Private,
  GameVisibility.Public, 
  GameVisibility.FriendsOnly
]);