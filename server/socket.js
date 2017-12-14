import socketIO from'socket.io';
import sticky from 'sticky-session';
import http from 'http';
import app from './server';
import redisAdapter from 'socket.io-redis';
import dotenv from 'dotenv';

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
      socket.on('getRooms', () => {
        game.adapter.allRooms((err, rooms) => {
          socket.emit('gameRooms', rooms);
        });
      });

      socket.on('createRoom', () => {
        const roomId = socket.id;
        game.adapter.remoteJoin(socket.id, roomId, (err) => {
          if (err) {
            console.error(err);
          }
          socket.emit('createRoom', 'success');
        });
      });


      socket.on('joinRoom', ({roomId}) => {
        game.adapter.remoteJoin(socket.id, roomId, (err) => {
          if (err) {
            console.error(err);
          }

          socket.to(roomId).emit('joinRoom', `${socket.id} has joined this room.`);
        });
      });

      socket.on('leaveRoom', ({roomId}) => {
        game.adapter.remoteLeave(socket.id, roomId, (err) => {
          if (err) {
            console.error(err);
          }

          socket.to(roomId).emit('leaveRoom', `${socket.id} has left this room.`);
        });
      });

      socket.on('updateLocation', ({location, roomId}) => {
        if(!socket.rooms.hasOwnProperty(roomId)) {
          console.error('Need roomId');
          return;
        }
        if(!location.latitude || !location.longitude) {
          console.error('Need location:{latitude, longitude}');
          return;
        }

        // TODO update User information with Redis.
        game.in(roomId).emit('updateLocations', 'TODO: notify locations of all users to all.');
      });

      socket.on('closeGame', () => {
        game.adapter.remoteDisconnect(socket.id, true, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });

      socket.on('disconnect', () => {});
    });
  }
};

export { listen };