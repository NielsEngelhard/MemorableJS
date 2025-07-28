import { useState, useEffect, useCallback } from 'react';
import { initSocket, disconnectSocket } from '../socket';

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Cleanup function
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