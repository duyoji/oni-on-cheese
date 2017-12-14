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
  console.log(`localhost:${port}`);

  if (isWorker) {
    // https://github.com/socketio/socket.io-redis

    const game = io.of('/game').on('connection', (socket) => {
      console.log(`connected, id: ${socket.id}`);

      socket.on('getRooms', () => {
        game.adapter.allRooms((err, rooms) => {
          console.log(rooms); // an array containing all rooms (accross every node)
          socket.emit('gameRooms', rooms);
        });
      });

      socket.on('createRoom', ({user}) => {
        const roomId = socket.id;
        game.adapter.remoteJoin(socket.id, roomId, (err) => {
          if (err) { /* unknown id */ }
          // success
          socket.emit('gameRooms', 'success');
        });
      });


      socket.on('joinRoom', ({roomId, user}) => {
        if(!user || !user.id || !user.name) return;

        game.adapter.remoteJoin(socket.id, roomId, (err) => {
          if (err) { /* unknown id */ }

          socket.to(roomId).emit('join', `${user.name} has joined this room.`);
        });
      });

      socket.on('leaveRoom', ({roomId, user}) => {
        if(!socket.rooms.hasOwnProperty(roomId)) return;
        if(!user || !user.id || !user.name) return;
        game.adapter.remoteLeave('<my-id>', 'room1', (err) => {
          if (err) { /* unknown id */ }

          socket.to(roomId).emit('leave', `${user.name} has left this room.`);
        });
      });

      socket.on('updateLocation', ({user, location, roomId}) => {
        if(!socket.rooms.hasOwnProperty(roomId)) return;
        if(!user || !user.id || !user.name) return;
        if(!location.latitude || !location.longitude) return;

        // TODO update Redis and
        game.in(roomId).emit('updateLocations', 'TODO: notify locations of all users to all.');
      });

      socket.on('disconnect', () => {
        console.log(`disconnected, id: ${socket.id}`);
      });
    });
  }
};

export { listen };