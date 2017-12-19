import socket from './index';

const createRoom = () => {
  socket.emit('createRoom');
  socket.on('resultCreateRoom', (data) => {
    console.log('io: createRoom in client', data);
  });
  console.log(socket.id)
  return socket.id
}

export default createRoom;