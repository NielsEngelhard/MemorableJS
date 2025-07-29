import { useState, useCallback, useEffect } from 'react';
import { useSocketBase } from './useSocketBase';

export const useMpGameSocket = () => {
  const { socket, isConnected, connectSocket } = useSocketBase();
  const [lobby, setLobby] = useState();

  useEffect(() => {
    if (socket) {
      socket.on('playerJoinedLobby', (newPlayer) => {
        console.log("player joined lobby", newPlayer);
        setLobby({
          ...lobby,
          players: [...lobby.players, newPlayer]
        });
      });
      
      socket.on('playerLeftLobby', (playerId) => {
        console.log('Player left lobby', playerId);
        setLobby({
          ...lobby,
          players: lobby.players.filter(p => p.id != playerId)
        });
      });
      
      // Clean up listeners
      return () => {
        socket.off('playerJoinedLobby');
        socket.off('playerLeftLobby');
      };
    }
  }, [socket,]);

  const joinLobby = useCallback((lobbyId, playerName) => {
    if (socket && isConnected) {
      socket.emit('joinLobby', { lobbyId, playerName });
    } else {
      console.error('Cannot join lobby: Socket not connected');
    }
  }, [socket, isConnected]);

  return {
    socket,
    isConnected,
    connectSocket,
    joinLobby,
    lobby,
    setLobby
  };
};