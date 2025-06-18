"use client"

import Button from "@/components/ui/Button";
import { useAuth } from "@/features/auth/auth-context";

export default function AccountPage() {
    const { logout } = useAuth();

    return (
        <div>
            <Button onClick={logout}>Logout</Button>
        </div>
    )
}