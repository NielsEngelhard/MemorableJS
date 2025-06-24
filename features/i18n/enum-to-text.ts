import { GameMode } from "@/drizzle/schema";

export default function GameModeToText(gameMode: GameMode): string {
    switch (gameMode) {
        case GameMode.Solo:
            return "Solo Game";
        case GameMode.Multiplayer:
            return "Multiplayer Game";
        case GameMode.WordOfTheDay:
            return "Word of the Day";
        default:
            return "<ERROR>";
    }
}