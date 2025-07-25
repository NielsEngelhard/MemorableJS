import { UserRole } from "@/drizzle/schema";
import { SupportedLanguage } from "../i18n/languages";

export interface UserModel {
    id: string;
    username: string;
    email: string;
    role: UserRole,
    level: number;    
    language: SupportedLanguage;
    colorHex?: string | null;
    createdAt?: Date;  
    favoriteWord?: string | null;
    winnerSlogan?: string | null;      
    lastWodPlayedUtc?: Date | null;
}

export interface UserSessionModel {
    sessionId: string;
}

export interface UserAndSessionModel {
    user: UserModel;
    session: UserSessionModel;
}