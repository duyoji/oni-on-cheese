import socketIO from'socket.io';
import sticky from 'sticky-session';
import http from 'http';
import app from './server';
import redisAdapter from 'socket.io-redis';
import dotenv from 'dotenv';

const SOCKET_PORT = '8888'

dotenv.config()


const io = socketIO();
io.adapter(redisAdapter(process.env.REDIS_URL, {key: 'prefix_name'}));
const server = http.createServer(app);

io.attach(server);
const isWorker = sticky.listen(server, SOCKET_PORT);

if (isWorker) {
  io.on('connection', (socket) => {
    console.log(`connected, id: ${socket.id}`);

    socket.on('getRooms', () => {
      socket.join(roomId, () => {
        io.to(roomId).emit(`${user.name} has joined the room`); // broadcast to everyone in the room
      });
    });

    // If roomId is empty, set socket.id as a unique room Id.
    //
    // https://socket.io/docs/rooms-and-namespaces/#default-room
    // Each Socket in Socket.IO is identified by a random, unguessable, unique identifier Socket#id.
    // For your convenience, each socket automatically joins a room identified by this id.
    socket.on('joinRoom', ({roomId = socket.id, user}) => {
      if(!user || !user.id || !user.name) return;

      socket.join(roomId, () => {
        io.to(roomId).emit(`${user.name} has joined the room`); // broadcast to everyone in the room
      });
    });

    socket.on('leaveRoom', ({roomId, user}) => {
      if(!socket.rooms.hasOwnProperty(roomId)) return;
      if(!user || !user.id || !user.name) return;
      socket.leave(roomId, () => {
        io.to(roomId).emit(`${user.name} has joined the room`); // broadcast to everyone in the room
      });
    });

    socket.on('updateLocation', ({user, location, roomId}) => {
      if(!socket.rooms.hasOwnProperty(roomId)) return;
      if(!user || !user.id || !user.name) return;
      if(!location.latitude || !location.longitude) return;

      // TODO update Redis and
      io.in(roomId).emit('notifyLocation', 'the game will start soon');
    });

    socket.on('disconnect', () => {
      console.log(`disconnected, id: ${socket.id}`);
    });
  });
}