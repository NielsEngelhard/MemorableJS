export const HOME_ROUTE = "/";
export const GAME_MODES_ROUTE = "/play";
export const SCORE_EXPLANATION_ROUTE = "/score";
export const SOLO_GAME_ROUTE = "/solo";
export const WORD_OF_THE_DAY_ROUTE = "/word-of-the-day";

export const IN_GAME_ROUTE = (gameId: string) => {
    return `/play/${gameId}`;
}

export const GAME_HISTORY_ROUTE = (gameHistoryId: string) => {
    return `/history/${gameHistoryId}`;
}