import socket from './index';

const SOCKET_EVENT_TYPES = {
  ON: 'connect'
};

const addHandlerListener = (callback = (socket) => {}) => { // eslint-disable-line no-unused-vars
  socket.on(SOCKET_EVENT_TYPES.ON, () => {
    callback(socket);
  });
};

export { addHandlerListener };