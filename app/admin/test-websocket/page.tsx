"use client"

import PageBase from "@/components/layout/PageBase";
import Button from "@/components/ui/Button";
import { useSocketBase } from "@/web-socket/useSocketBase";
import FixedRealtimeStatusIndicator from "@/features/realtime/components/FixedRealtimeStatusIndicator";
import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/auth-context";

const POC_EVENT_NAME = "poc-event";

export default function TestWebSocket() {

    const { user } = useAuth();
    const { isConnected, connectSocket, disconnect, socket } = useSocketBase();
    const [pocItems, setPocItems] = useState<string[]>([]);

    useEffect(() => {
        if (!socket) return;

        socket.on(POC_EVENT_NAME, (username) => {
            console.log("Trigger poc event");

            setPocItems((prev) => [...prev, username]);
        });
    }, [socket]);

    function onConnectClick() {
        connectSocket();
        if (!socket) throw Error("Socket is not found after connect");
        
        socket.emit(POC_EVENT_NAME, user?.username ?? "no-username");
    }

    return (
        <PageBase>
            <div className="flex flex-col gap-4">
                <div className="text-2xl font-bold">
                    {socket?.id}
                </div>

                <div className="flex flex-col gap-2">
                    <Button variant="success" onClick={onConnectClick}>CONNECT WEBSOCKET</Button>
                    <Button variant="error" onClick={disconnect}>DISCONNECTCONNECT WEBSOCKET</Button>
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