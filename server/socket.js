import socketIO from'socket.io';
import sticky from 'sticky-session';
import http from 'http';
import redisAdapter from 'socket.io-redis';
import dotenv from 'dotenv';
import { setSocketEventHandler } from './socketHandlers/index';

// Read .env file and set value in process.env
dotenv.config();

const listen = (expressApp, port) => {
  // const io = socketIO();
  const server = http.createServer(expressApp);
  const io = socketIO(server);
  // console.log(io);

  io.adapter(redisAdapter(process.env.REDIS_URL));
  // io.attach(server);

  // const isWorker = sticky.listen(server, port);

  // if (isWorker) {
  //   const game = io.of('/game').on('connection', (socket) => {
  //     setSocketEventHandler(socket, game);
  //   });
  // }
  const game = io.of('/game').on('connection', (socket) => {
    setSocketEventHandler(socket, game);
  });

  server.listen(port);
};

export { listen };