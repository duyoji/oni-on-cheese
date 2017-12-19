import socket from './index';

const createRoom = () => {
  socket.emit('createRoom');
  socket.on('resultCreateRoom', (data) => {
    console.log('io: createRoom in client', data);
  });
}

export default createRoom;