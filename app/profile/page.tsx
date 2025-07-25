"use client";

import { useAuth } from "@/features/auth/auth-context";
import { HOME_ROUTE, PROFILE_ROUTE } from "@/lib/routes";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function MyOwnProfilePage() {
    const { user } = useAuth();

    useEffect(() => {
        if (!user) redirect(HOME_ROUTE);
        else redirect(PROFILE_ROUTE(user.username));
    }, []);    

    return (
        <></>
    )
}