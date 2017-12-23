import socket from './index';

const SOCKET_EVENT_TYPES = {
  ON: 'resultLeaveRoom'
};

const addHandlerListener = (callback = (userId) => {}) => {
  socket.on(SOCKET_EVENT_TYPES.ON, (data) => {
    if(data.result.error) {
      // TODO: Error handling.
    } else {
      // This location is parsed to JSON by server.
      callback(data.result.data.userId);
    }
  });
};

export { addHandlerListener };