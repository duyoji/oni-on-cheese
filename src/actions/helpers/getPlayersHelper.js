import socket from '../../socketHandlers/index';

const SOCKET_EVENT_TYPES = {
  EMIT: 'getPlayers',
  ON: 'resultGetPlayers'
}

const getPlayersPromise = (roomId) => {
  return new Promise((resolve, reject) => {
    socket.on(SOCKET_EVENT_TYPES.ON, (data) => {
      if(data.result.error) {
        resolve(data.result.error);
      } else {
        const playerIds = data.result.data;
        reject(playerIds);
      }
    });
    socket.emit(SOCKET_EVENT_TYPES.EMIT, roomId);
  });
};

export { getPlayersPromise };