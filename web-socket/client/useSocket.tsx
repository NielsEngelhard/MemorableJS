import { useCallback, useEffect, useState } from "react";
import io, { Socket } from 'socket.io-client'

interface UseSocketProps {
    autoConnect?: boolean;
}

export function useSocket({ autoConnect = true }: UseSocketProps) {
    const [isConnected, setIsConnected] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);    

    // On initialize
    useEffect(() => {
        const socketInstance = io('http://localhost:3000', { autoConnect: autoConnect });

        setSocket(socketInstance);

        socketInstance.on('connect', () => {
            console.log('Connected to server:', socketInstance?.id)
            setIsConnected(true)
        });

        // TODO: MISSCHIEN DIT LOSTREKKEN?
        socketInstance.on('healthcheck', () => {
            console.log("logging healthcheck in the client");
        });      

        return disconnect;
    }, []);

    const connect = useCallback(() => {
        if (socket && !socket.disconnected) {
            socket.connect();
        }
    }, []);

    const disconnect = useCallback(() => {
        console.log("DISCONNECTING WEB SOCKET: " + socket?.id);
        socket?.disconnect();
    }, []);

    return {
        socket,
        isConnected,
        connect,
    }
}