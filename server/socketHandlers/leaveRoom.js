import { formatOutput } from '../formatters/socketHandlerFormatter';

const EVENT_TYPES = {
  ON: 'leaveRoom',
  EMIT: 'resultLeaveRoom'
};

// See: ./index.js
const leaveRoom = (socket, socketNamespace) => {
  socket.on(EVENT_TYPES.ON, ({roomId}) => {
    socketNamespace.adapter.remoteLeave(socket.id, roomId, (error) => {
      if (error) {
        socket.emit(EVENT_TYPES.EMIT, formatOutput({error}));
        return;
      }
      socket.to(roomId).emit(EVENT_TYPES.EMIT, formatOutput({data: `${socket.id} has left this room.`}));
    });
  });
};

export { leaveRoom };