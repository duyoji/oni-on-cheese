import { formatOutput } from '../formatters/socketHandlerFormatter';

const EVENT_TYPES = {
  ON: 'getRooms',
  EMIT: 'resultGetRooms'
};

// See: ./index.js
const getRooms = (socket, socketNameSpace) => {
  socket.on(EVENT_TYPES.ON, () => {
    socketNameSpace.adapter.allRooms((err, rooms) => {
      if(err) {
        socket.emit(EVENT_TYPES.EMIT, formatOutput({error: err}));
        return;
      }

      socket.emit(EVENT_TYPES.EMIT, formatOutput({data: rooms}));
    });
  });
};

export { getRooms };