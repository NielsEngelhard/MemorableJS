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
    
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });

    socket.on('healthcheck', () => {
      console.log("HEALTHCHECK IN BACK_END");
      socket.emit("healthcheck");
    });
  });

  server.listen(3000, (err?: Error) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});