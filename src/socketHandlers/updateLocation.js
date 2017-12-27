import socket from './index';

const SOCKET_EVENT_TYPES = {
  EMIT: 'updateLocation',
  ON: 'resultUpdateLocation'
};

/**
 * required: location: string. (JSON.stringify({latitude:111, longitude, -111}))
 * required: roomId: string
 * optional: id: string
 * optional: name: string
 * optional: iconUrl: string
 */
const emit = ({location, roomId, id = socket.id, name = socket.id, iconUrl = ''}) => { // eslint-disable-line no-unused-vars
  socket.emit(SOCKET_EVENT_TYPES.EMIT, {
    id,
    name,
    iconUrl,
    location,
    roomId
  });
};

/**
 * id: string
 * name: string
 * iconUrl: string
 * location: object {latitude, longitude}
 */
const addHandlerListener = (callback = ({id, name, iconUrl, location}) => {}) => { // eslint-disable-line no-unused-vars
  socket.on(SOCKET_EVENT_TYPES.ON, (data) => {
    if(data.result.error) {
      // TODO: Error handling.
    } else {
      // This location is parsed to JSON by server.
      const {id, name, iconUrl, location} = data.result.data;
      callback({id, name, iconUrl, location});
    }
  });
};

export { emit, addHandlerListener };