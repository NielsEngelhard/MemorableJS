"use client"

import PageBase from "@/components/layout/PageBase";
import Button from "@/components/ui/Button";
import FixedRealtimeStatusIndicator from "@/features/realtime/components/FixedRealtimeStatusIndicator";
import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/auth-context";
import io from 'socket.io-client';
import { Socket } from "socket.io";
import { MpLobbyPlayerModel } from "@/features/mp-lobby/models";
import { getGlobalIO } from "@/web-socket/socket-instance";
import { useSocket } from "@/web-socket/client/useSocket";
import TriggerWebsocketHealthCheck from "@/features/admin/command/trigger-websocket-healthcheck";

export default function TestWebSocket() {
    const { user, } = useAuth();
    const [pocItems, setPocItems] = useState<string[]>([]);
    const { isConnected, socket } = useSocket({});

    async function onConnectClick() {
    }

    function triggerHealthCheck() {
        TriggerWebsocketHealthCheck();
    }

    function triggerPocEvent() {

    }

    return (
        <PageBase>
            <div className="flex flex-col gap-4">
                <div className="text-2xl font-bold">
                    {socket?.id}
                </div>

                <div className="flex flex-col gap-2">
                    <Button variant="primary" onClick={triggerPocEvent} disabled={!isConnected}>TRIGGER POC EVENT</Button>
                    <Button variant="orange" onClick={triggerHealthCheck} disabled={!isConnected}>EMIT HEALTHCHECK</Button>
                    {/* <Button variant="success" onClick={onConnectClick} disabled={isConnected}>CONNECT WEBSOCKET</Button>
                    <Button variant="error" onClick={disconnect} disabled={!isConnected}>DISCONNECTCONNECT WEBSOCKET</Button>=                    
                    <Button variant="orange" onClick={triggerHealthCheck} disabled={!isConnected}>EMIT HEALTHCHECK</Button> */}
                </div> 

                <div className="flex flex-col">
                    <div>Connected users:</div>
                    <div className="flex gap-1">
                        {pocItems.map((item) => {
                            return <div className="font-bold">{item}</div>
                        })}                        
                    </div>
                </div>

                <FixedRealtimeStatusIndicator isConnected={isConnected} />               
            </div>
        </PageBase>
    )
}