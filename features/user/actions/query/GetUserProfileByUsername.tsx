"use server";

import { db } from "@/drizzle/db";
import { DbUserProfile } from "@/drizzle/schema";
import { UserProfileModel } from "../../models";
import { MapDbUserProfileToModel } from "../../mapper";

export default async function GetUserProfileByUsernae(username: string): Promise<UserProfileModel | null> {
    const userProfile = await GetUserProfile(username);
    return MapDbUserProfileToModel(userProfile);
}

async function GetUserProfile(username: string): Promise<DbUserProfile> {
    const resp = await db.query.UsersTable.findFirst({
        where: (user, { eq }) => eq(user.username, username),
        with: {
            settings: true,
            statistics: true
        }
    });

    if (!resp) throw Error(`Could not find user profile with username ${username}`);

    return resp as unknown as DbUserProfile;
}