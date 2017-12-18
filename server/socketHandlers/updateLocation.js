import { formatOutput } from '../formatters/socketHandlerFormatter';

const EVENT_TYPES = {
  ON: 'updateLocation',
  EMIT: 'resultUpdateLocation'
};

// See: ./index.js
const updateLocation = (socket, socketNamespace) => {
  socket.on('updateLocation', ({location, roomId}) => {
    // Only when There is no error, broadcast data to all members in same room including sender.
    // If something error happen, send a discription of the error to sender.
    if(!roomId) {
      const error = new Error('Need to put a roomId');
      socket.emit(EVENT_TYPES.EMIT, formatOutput({error}));
      return;
    }
    if(!location || !location.latitude || !location.longitude) {
      const error = new Error('Need to put a location that includes latitude and longitude properties.');
      socket.emit(EVENT_TYPES.EMIT, formatOutput({error}));
      return;
    }

    // TODO update user's location in redis.
    socketNamespace.in(roomId).emit('resultUpdateLocation', formatOutput({data: 'TODO: notify locations of all users to all.'}));
  });
};

export { updateLocation };