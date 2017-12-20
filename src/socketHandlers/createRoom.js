import socket from './index';

const createRoom = (cb) => {
  socket.emit('createRoom');
  socket.on('resultCreateRoom', (data) => {
    console.log('io: createRoom in client', data);
    cb();
  });
}

export default createRoom;