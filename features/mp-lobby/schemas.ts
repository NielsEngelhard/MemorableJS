import { z } from "zod";
import { GAME_ID_LENGTH } from "../game/util/game-id-generator";

export const joinGameSchema = z.object({
    joinCode: z.string().min(GAME_ID_LENGTH).max(GAME_ID_LENGTH)
});
export type JoinGameSchema = z.infer<typeof joinGameSchema>;