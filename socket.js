import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

// Create a singleton socket instance
let socket;

export const initSocket = () => {
  if (!socket) {
    socket = io(URL, {
      autoConnect: false,
    });
  }
  
  if (!socket.connected) {
    socket.connect();
  }
  
  return socket;
};

export const getSocket = () => {
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};