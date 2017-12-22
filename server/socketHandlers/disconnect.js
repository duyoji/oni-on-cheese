import { formatOutput } from '../formatters/socketHandlerFormatter';
const EVENT_TYPES = {
  EMIT: 'resultLeaveRoom'
};

// See: ./index.js
const disconnect = (socket, socketNamespace) => { // eslint-disable-line no-unused-vars
  socket.on('disconnect', () => {
    const rooms = socketNamespace.adapter.rooms;

    // TODO: If I can get the specific roomId where the user was, Use the roomId.
    // For now Just emit left user id to all rooms.
    for(let roomId in rooms) {
      const userId = socket.id;
      socketNamespace.in(roomId).emit(EVENT_TYPES.EMIT, formatOutput({data: {userId}}));
    }
  });
};

export { disconnect };