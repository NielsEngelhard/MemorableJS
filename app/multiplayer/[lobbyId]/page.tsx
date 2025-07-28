"use client"
import PageBase from "@/components/layout/PageBase";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MpLobbyModel } from "@/features/mp-lobby/models";
import JoinMpLobby from "@/features/mp-lobby/actions/command/JoinMpLobby";
import { MP_ROUTE } from "@/lib/routes";
import MpLobbyOverview from "@/features/mp-lobby/components/MpLobbyOverview";
import { Socket } from "socket.io";
import { useSocket } from '@/hooks/useSocket';
import { useAuth } from "@/features/auth/auth-context";

export default function MpLobbyPage() {
    const { user } = useAuth();
    const [lobby, setLobby] = useState<MpLobbyModel | undefined>(undefined);
    const { socket,  isConnected,  joinLobby } = useSocket();

    const params = useParams();
    const lobbyId = params.lobbyId;
    
    useEffect(() => {
        async function JoinLobby() {
            if (!lobbyId) return;
            
            try {
                var resp = await JoinMpLobby(lobbyId.toString());
                if (!resp) redirect(MP_ROUTE);
                setLobby(resp.lobby);
                joinLobby(resp.lobby?.id, user?.username);
            } catch {
                redirect(MP_ROUTE);
            }
        }

        JoinLobby();
    }, [lobbyId]);



    return (
        <PageBase>
            {lobby ? (
                <MpLobbyOverview
                    lobby={lobby}
                />             
            ) : (
                <div>loading...</div>
            )}          
        </PageBase>
    )
}