import { DbUserProfile } from "@/drizzle/schema";
import { UserProfileModel } from "./models";

export function MapDbUserProfileToModel(u: DbUserProfile): UserProfileModel {
    return {
        user: {
            id: u.id,
            createdAt: u.createdAt,
            level: u.level,
            role: u.role,
            username: u.username,
            colorHex: u.colorHex,
            favoriteWord: u.favoriteWord,
            winnerSlogan: u.winnerSlogan,
            email: u.email,       
        },
        settings: {
            id: "",
            playSoundEffects: u.settings.playSoundEffects,
            preFillWord: u.settings.preFillWord,
            showOnScreenKeyboard: u.settings.showOnScreenKeyboard,            
        },
        statistics: {   
            highestScore: u.statistics.highestScore,
            totalGamesPlayed: u.statistics.totalGamesPlayed,

            wodTotalGamesPlayed: u.statistics.wodTotalGamesPlayed,
            wodTotalGamesWon: u.statistics.wodTotalGamesWon,
        }
    }
}