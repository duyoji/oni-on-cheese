import socketIO from'socket.io';
import sticky from 'sticky-session';
import http from 'http';
import app from './server';

const io = socketIO();
const server = http.createServer(app);

io.attach(server);
const isWorker = sticky.listen(server, 3000);

if (isWorker) {

  io.on('connection', (socket) => {
    console.log(`connected, id: ${socket.id}`);

    socket.on('chat message', (user, message) => {
      data = `${message} from ${user}`;
      console.log(data);
      socket.broadcast.emit('chat message', data);
    });

    socket.on('disconnect', () => {
      console.log(`disconnected, id: ${socket.id}`);
    });
  });
}