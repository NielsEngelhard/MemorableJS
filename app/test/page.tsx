"use client"

import PageBase from "@/components/layout/PageBase";
import Button from "@/components/ui/Button";
import { initSocket, disconnectSocket } from "../../socket";

export default function TestPage() {

    function onConnectSocket() {
        initSocket();
    }

    return (
        <PageBase>
            <div className="flex flex-col gap-2">
                <Button variant="success" onClick={onConnectSocket}>CONNECT WEBSOCKET</Button>
                <Button variant="error" onClick={() => disconnectSocket()}>DISCONNECTCONNECT WEBSOCKET</Button>
            </div>
        </PageBase>
    )
}