import { formatOutput } from '../formatters/socketHandlerFormatter';

const EVENT_TYPES = {
  ON: 'joinRoom',
  EMIT: 'resultJoinRoom'
};

// See: ./index.js
const joinRoom = (socket, socketNamespace) => {
  socket.on(EVENT_TYPES.ON, ({roomId}) => {
    socketNamespace.adapter.remoteJoin(socket.id, roomId, (error) => {
      if (error) {
        socket.emit(EVENT_TYPES.EMIT, formatOutput({error}));
        return;
      }

      // For user joining this room.
      socket.emit(EVENT_TYPES.EMIT, formatOutput({data: `Join succeeded.`}));

      // For users already joined this room.
      socket.to(roomId).emit(EVENT_TYPES.EMIT, formatOutput({data: `${socket.id} has joined this room.`}));
    });
  });
};

export { joinRoom };