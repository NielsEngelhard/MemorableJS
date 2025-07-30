import { Server as SocketIOServer } from 'socket.io';

// Global socket instance
let globalIO: SocketIOServer | null = null;

export const setGlobalIO = (io: SocketIOServer) => {
  globalIO = io;
};

export const getGlobalIO = (): SocketIOServer | null => {
  return globalIO;
};