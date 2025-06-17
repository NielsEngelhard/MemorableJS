interface UserModel {
    id: string;
    username: string;
    email: string;
    level: number;
    colorHex?: string | null;
    joinDate?: Date;
}

interface UserSessionModel {
    sessionId: string;
}

interface UserAndSessionModel {
    user: UserModel;
    session: UserSessionModel;
}