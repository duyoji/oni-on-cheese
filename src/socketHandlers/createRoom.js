import socket from './index';

const createRoom = (cb) => {  
  socket.emit('createRoom');
  socket.on('resultCreateRoom', (data) => {
    cb();
  });
}

export default createRoom;