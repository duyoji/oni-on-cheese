import io from 'socket.io-client';
const socket = io('localhost:9000/game');

export function createRoom() {
  socket.emit('createRoom');
  socket.on('resultCreateRoom', (data) => {
    console.log('io: createRoom in client', data);
  });
}