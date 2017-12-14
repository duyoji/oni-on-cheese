import socketIO from'socket.io';
import sticky from 'sticky-session';
import http from 'http';
import app from './server';
import redisAdapter from 'socket.io-redis';
import dotenv from 'dotenv';
import { setSocketEventHandler } from './socketHandlers/index';

// Read .env file and set value in process.env
dotenv.config()
const DEFAULT_PORT = '8888'

const listen = (expressApp, port = DEFAULT_PORT) => {
  const io = socketIO();
  const server = http.createServer(expressApp);

  io.adapter(redisAdapter(process.env.REDIS_URL));
  io.attach(server);
  const isWorker = sticky.listen(server, port);

  if (isWorker) {
    const game = io.of('/game').on('connection', (socket) => {
      setSocketEventHandler(socket, game);
    });
  }
};

export { listen };