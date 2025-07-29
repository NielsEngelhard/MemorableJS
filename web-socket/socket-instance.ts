import { Server as SocketIOServer } from 'socket.io';

// Global socket instance
let globalIO: SocketIOServer | null = null;

export const setGlobalIO = (io: SocketIOServer) => {
  globalIO = io;
};

export const getGlobalIO = (): SocketIOServer | null => {
  return globalIO;
};

export const emitToLobby = (lobbyId: string, event: string, data: any) => {
  if (globalIO) {
    globalIO.to(lobbyId).emit(event, data);
    return true;
  }
  console.warn('Socket.IO instance not available');
  return false;
};