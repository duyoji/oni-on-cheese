import socket from './index';

const SOCKET_EVENT_TYPES = {
  ON: 'connect'
};

const addHandlerListener = (callback = (socket) => {}) => {
  socket.on(SOCKET_EVENT_TYPES.ON, () => {
    callback(socket);
  });
};

export { addHandlerListener };