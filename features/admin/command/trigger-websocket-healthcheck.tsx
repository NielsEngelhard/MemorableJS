"use server"

import { getGlobalIO } from "@/web-socket/socket-instance"

export default async function TriggerWebsocketHealthCheck(): Promise<null> {
    console.log("IN THE SERVER TRIGGER WEBSOCKET HEALTHCHECK ENDPOINT");
    const io = getGlobalIO();
    console.log(io);
    // io!.emit("healthcheck");

    return null;
}