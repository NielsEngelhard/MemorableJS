import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server } from 'socket.io';

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

  // Socket.io connection handler
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    
    socket.on('message', (data: MessageData) => {
      console.log('Message received:', data);
      // Broadcast to all clients or handle as needed
      io.emit('message', data);
    });

    socket.on('joinLobby', (data: JoinLobbyData) => {
      socket.join(data.lobbyId);
      
      // Broadcast to everyone in the lobby that a new player joined
      // Fixed the bug: was using 'lobbyId' instead of 'data.lobbyId'
      io.to(data.lobbyId).emit('playerJoinedLobby', {
        test: "to see if this is OK"
      });      
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