"use client";

import PageBase from "@/components/layout/PageBase";
import GetUserProfileByUsernae from "@/features/user/actions/query/GetUserProfileByUsername";
import UserProfile from "@/features/user/components/UserProfile";
import { UserProfileModel } from "@/features/user/models";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const [userProfile, setUserProfile] = useState<UserProfileModel | undefined>(undefined);

    const params = useParams();
    const username = params.username;

    useEffect(() => {
        async function GetGame() {
            if (!username) return;
            var resp = await GetUserProfileByUsernae(username.toString());

            if (!resp) redirect("/play");
            setUserProfile(resp);
        }

        GetGame();
    }, [username]);    

    return (
        <PageBase>
            {userProfile ? (
                <UserProfile userProfile={userProfile} />
            ) : (
                <div>Loading...</div>
            )}
        </PageBase>
    )
}