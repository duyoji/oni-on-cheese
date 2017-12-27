import { formatOutput } from '../formatters/socketHandlerFormatter';
import User from '../models/User';

const EVENT_TYPES = {
  ON: 'updateLocation',
  EMIT: 'resultUpdateLocation'
};

// See: ./index.js
const updateLocation = (socket, socketNamespace) => {
  socket.on('updateLocation', ({location, roomId, id = socket.id, name = socket.id, iconUrl = ''}) => {
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

    User
      .build({
        id,
        name,
        iconUrl,
        location: JSON.stringify(location)
      })
      .then(user => {
        socketNamespace.in(roomId).emit(EVENT_TYPES.EMIT, formatOutput({data: user.serialize()}));
        console.log(`Emitted to ${roomId} from ${id} of user, location: ${location}`); // eslint-disable-line no-console
      })
      .catch(error => {
        socket.emit(EVENT_TYPES.EMIT, formatOutput({error}));
        console.error(`Error: Tried to emit to ${roomId} from ${id} of user, the reason of error is ${error}`); // eslint-disable-line no-console
      });
  });
};

export { updateLocation };