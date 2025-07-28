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

    socketInstance.on('playerJoinedLobby', () => {
      console.log('Player joined lobby:', data);
    });    
    
    setSocket(socketInstance);
    return socketInstance;
  }, []);

  const joinLobby = useCallback((lobbyId, playerName) => {
    if (socket && isConnected) {
      socket.emit('joinLobby', { lobbyId, playerName });
    } else {
      console.error('Cannot join lobby: Socket not connected');
    }
  }, [socket, isConnected]);  

  return { socket, isConnected, connectSocket, joinLobby };
};