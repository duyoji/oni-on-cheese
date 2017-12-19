import { formatOutput } from '../formatters/socketHandlerFormatter';

const EVENT_TYPES = {
  ON: 'createRoom',
  EMIT: 'resultCreateRoom'
};

// See: ./index.js
const createRoom = (socket, socketNamespace) => {
  socket.on(EVENT_TYPES.ON, () => {
    const roomId = socket.id;
    socketNamespace.adapter.remoteJoin(socket.id, roomId, (error) => {
      if (error) {
        socket.emit(EVENT_TYPES.EMIT, formatOutput({error}));
        return;
      }
      socket.emit(EVENT_TYPES.EMIT, formatOutput({data: 'success'}));
    });
  });
};

export { createRoom };