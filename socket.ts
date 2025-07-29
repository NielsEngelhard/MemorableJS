import { io, Socket } from 'socket.io-client';

// Define interfaces for your socket events
interface ServerToClientEvents {
  message: (data: MessageData) => void;
  playerJoinedLobby: (data: PlayerJoinedData) => void;
}

interface ClientToServerEvents {
  message: (data: MessageData) => void;
  joinLobby: (data: JoinLobbyData) => void;
}

interface MessageData {
  [key: string]: any; // Make this more specific based on your message structure
}

interface PlayerJoinedData {
  test: string;
  // Add other properties as needed
}

interface JoinLobbyData {
  lobbyId: string;
}

// Type the socket with your event interfaces
type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

const URL: string | undefined = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

let socket: TypedSocket | null = null;

export const initSocket = (): TypedSocket => {
  if (!socket) {
    socket = io(URL, {
      autoConnect: false,
    }) as TypedSocket;
  }
  
  if (!socket.connected) {
    socket.connect();
  }
  
  return socket;
};

export const getSocket = (): TypedSocket | null => {
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// Type-safe event emitters
export const emitMessage = (data: MessageData): void => {
  if (socket) {
    socket.emit('message', data);
  }
};

export const joinLobby = (lobbyId: string): void => {
  if (socket) {
    socket.emit('joinLobby', { lobbyId });
  }
};

// Type-safe event listeners
export const onMessage = (callback: (data: MessageData) => void): void => {
  if (socket) {
    socket.on('message', callback);
  }
};

export const onPlayerJoinedLobby = (callback: (data: PlayerJoinedData) => void): void => {
  if (socket) {
    socket.on('playerJoinedLobby', callback);
  }
};

export const removeAllListeners = (): void => {
  if (socket) {
    socket.removeAllListeners();
  }
};