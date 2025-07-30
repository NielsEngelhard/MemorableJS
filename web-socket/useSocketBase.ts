import { useState, useEffect, useCallback } from 'react';
import { Socket } from 'socket.io-client';
import { initSocket, disconnectSocket } from '../socket';

interface UseSocketBaseReturn {
  socket: Socket | null;
  isConnected: boolean;
  connectSocket: () => Socket;
  disconnect: () => void;
}

export const useSocketBase = (): UseSocketBaseReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      if (socket) {
        disconnectSocket();
      }
    };
  }, [socket]);

  const connectSocket = useCallback((): Socket => {
    const socketInstance = initSocket();
    
    socketInstance.on('connect', () => {
      console.log('Socket connected!');
      setIsConnected(true);
    });
    
    socketInstance.on('disconnect', () => {
      console.log('Socket disconnected!');
      setIsConnected(false);
    });
    
    setSocket(socketInstance);
    return socketInstance;
  }, []);

  const disconnect = useCallback((): void => {
    if (socket) {
      socket.removeAllListeners();
    }
    disconnectSocket();
    setSocket(null);
    setIsConnected(false);
  }, [socket]);

  return { socket, isConnected, connectSocket, disconnect };
};
