import socket from './index';

const createRoom = (cb) => {
  socket.emit('createRoom');
  socket.on('resultCreateRoom', (data) => { // eslint-disable-line no-unused-vars
    cb();
  });
};

export default createRoom;