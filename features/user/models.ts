import { UserModel } from "../auth/models";

export interface UserProfileModel {
    user: UserModel;
    settings: UserSettingsModel;
    statistics: UserStatisticsModel;
}

export interface UserSettingsModel {
    id: string;
    showOnScreenKeyboard: boolean;
    playSoundEffects: boolean;
    preFillWord: boolean;
}

export interface UserStatisticsModel {
    totalGamesPlayed: number;
    highestScore: number;

    wodTotalGamesPlayed: number;
    wodTotalGamesWon: number;
}