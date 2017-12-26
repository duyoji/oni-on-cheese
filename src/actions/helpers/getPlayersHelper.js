import socket from '../../socketHandlers/index';

const SOCKET_EVENT_TYPES = {
  EMIT: 'getPlayers',
  ON: 'resultGetPlayers'
}

const getPlayersPromise = (roomIds) => {
  return roomIds.map((roomId) => {
    return new Promise((resolve, reject) => {
      socket.on(SOCKET_EVENT_TYPES.ON + roomId, (data) => {
        if(data.result.error) {
          reject(data.result.error);
        } else {
          const playerIds = data.result.data;
          const numberOfPlayers = playerIds.length;
          resolve({
            roomId,
            numberOfPlayers
          });
        };
      });
      socket.emit(SOCKET_EVENT_TYPES.EMIT, roomId);
    });
  });
};

export { getPlayersPromise };