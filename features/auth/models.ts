import { UserRole } from "@/drizzle/schema";

export interface UserModel {
    id: string;
    username: string;
    email: string;
    role: UserRole,
    level: number;
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