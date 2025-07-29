// hooks/useSocketBase.js - Basic socket connection management
import { useState, useEffect, useCallback } from 'react';
import { initSocket, disconnectSocket } from '../socket';

export const useSocketBase = () => {
  const [socket, setSocket] = useState();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    return () => {
      if (socket) {
        disconnectSocket();
      }
    };
  }, [socket]);

  const connectSocket = useCallback(() => {
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

  return { socket, isConnected, connectSocket };
};