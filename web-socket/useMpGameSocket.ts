import { useState, useCallback, useEffect } from 'react';
import { useSocketBase } from './useSocketBase';
import { MpLobbyModel, MpLobbyPlayerModel } from '@/features/mp-lobby/models';

export const useMpGameSocket = () => {
  const { socket, isConnected, connectSocket } = useSocketBase();
  const [lobby, setLobby] = useState<MpLobbyModel>();

  useEffect(() => {
    if (socket) {
      socket.on('playerJoinedLobby', (newPlayer: MpLobbyPlayerModel) => {
        if (!lobby) return;

        console.log("player joined lobby", newPlayer);
        setLobby({
          ...lobby,
          players: [...lobby.players, newPlayer]
        });
      });
      
      socket.on('playerLeftLobby', (playerId) => {
        if (!lobby) return;

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

  const joinLobby = useCallback((lobbyId: string, playerName: string) => {
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