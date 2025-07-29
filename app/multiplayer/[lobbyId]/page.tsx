"use client"
import PageBase from "@/components/layout/PageBase";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MpLobbyModel } from "@/features/mp-lobby/models";
import JoinMpLobby from "@/features/mp-lobby/actions/command/JoinMpLobby";
import { MP_ROUTE } from "@/lib/routes";
import MpLobbyOverview from "@/features/mp-lobby/components/MpLobbyOverview";
import { useAuth } from "@/features/auth/auth-context";
import { useMpGameSocket } from "@/web-socket/useMpGameSocket";
import TopOfPageRealtimeStatusIndicator from "@/features/realtime/components/TopOfPageRealtimeStatusIndicator";

export default function MpLobbyPage() {
    const { user } = useAuth();
    const { isConnected,  joinLobby, setLobby, lobby, connectSocket } = useMpGameSocket();

    const params = useParams();
    const lobbyId = params.lobbyId;
    
    useEffect(() => {
        async function Initialize() {
            if (!lobbyId) return;
            
            try {
                var resp = await JoinMpLobby(lobbyId.toString());
                if (!resp) redirect(MP_ROUTE);

                debugger;
                setLobby(resp.lobby as any);

                connectSocket();
            } catch {
                redirect(MP_ROUTE);
            }
        }

        Initialize();
    }, [lobbyId]);

    useEffect(() => {
        if (!isConnected || lobby == undefined || !user) return;

        joinLobby(lobby.id, user.username);
    }, [isConnected]);

    return (
        <PageBase>        
            {lobby ? (
                <>
                    <MpLobbyOverview
                        lobby={lobby}
                    />
                    
                    <TopOfPageRealtimeStatusIndicator isConnected={isConnected}  />                
                </>
            ) : (
                <div>loading...</div>
            )}          
        </PageBase>
    )
}