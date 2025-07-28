export const HOME_ROUTE = "/";
export const GAME_MODES_ROUTE = "/play";
export const SCORE_EXPLANATION_ROUTE = "/score";
export const SOLO_GAME_ROUTE = "/solo";
export const WORD_OF_THE_DAY_ROUTE = "/word-of-the-day";
export const PLAY_WORD_OF_THE_DAY_ROUTE = "/word-of-the-day/play";
export const MP_ROUTE = "/multiplayer";

export const MP_LOBBY_ROUTE = (lobbyId: string) => {
    return `/multiplayer/${lobbyId}`;
}

export const IN_GAME_ROUTE = (gameId: string) => {
    return `/play/${gameId}`;
}

export const GAME_HISTORY_ROUTE = (gameHistoryId: string) => {
    return `/history/${gameHistoryId}`;
}

export const PROFILE_ROUTE = (username: string) => {
    return `/profile/${username}`;
}
