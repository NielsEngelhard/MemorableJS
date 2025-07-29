import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server } from 'socket.io';
import { MpLobbyPlayerModel } from './features/mp-lobby/models';
import { setGlobalIO } from './web-socket/socket-instance';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

interface JoinLobbyData {
  lobbyId: string;
}

interface MessageData {
  [key: string]: any;
}

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  // Initialize Socket.io
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  setGlobalIO(io);

  // Socket.io connection handler
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    
    socket.on('message', (data: MessageData) => {
      console.log('Message received:', data);
      // Broadcast to all clients or handle as needed
      io.emit('message', data);
    });

    socket.on('joinLobby', (lobbyId: string, player: MpLobbyPlayerModel) => {
      socket.join(lobbyId);
      
      // Broadcast to everyone in the lobby that a new player joined
      // Fixed the bug: was using 'lobbyId' instead of 'data.lobbyId'
      io.to(lobbyId).emit('playerJoinedLobby', player);      
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  server.listen(3000, (err?: Error) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});