export const HOME_ROUTE = "/";
export const GAME_MODES_ROUTE = "/play";
export const SCORE_EXPLANATION_ROUTE = "/score";
export const SOLO_GAME_ROUTE = "/solo";

export const IN_GAME_ROUTE = (gameId: string) => {
    return `/play/${gameId}`;
}