"use client"

import PageBase from "@/components/layout/PageBase";
import Button from "@/components/ui/Button";
import { initSocket, disconnectSocket } from "../../../socket";
import { useSocketBase } from "@/web-socket/useSocketBase";
import TopOfPageRealtimeStatusIndicator from "@/features/realtime/components/TopOfPageRealtimeStatusIndicator";

export default function TestWebSocket() {

    const { isConnected, connectSocket, disconnect, socket } = useSocketBase();

    return (
        <PageBase>
            <div className="flex flex-col gap-4">
                <div className="text-2xl font-bold">
                    {socket?.id}
                </div>

                <div className="flex flex-col gap-2">
                    <Button variant="success" onClick={connectSocket}>CONNECT WEBSOCKET</Button>
                    <Button variant="error" onClick={disconnect}>DISCONNECTCONNECT WEBSOCKET</Button>
                </div> 

                <TopOfPageRealtimeStatusIndicator isConnected={isConnected} />               
            </div>
        </PageBase>
    )
}