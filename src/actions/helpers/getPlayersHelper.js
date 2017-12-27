import socket from '../../socketHandlers/index';

const SOCKET_EVENT_TYPES = {
  EMIT: 'getPlayers',
  ON: 'resultGetPlayers'
};

const getPlayersPromise = (roomIds) => {
  return new Promise((resolve, reject) => {
    socket.on(SOCKET_EVENT_TYPES, (data) => {
      if(data.result.error) {
        reject(data.result.error);
      } else {
        const roomId = data.result.data.roomId
        const playerIds = data.result.data.playerIds;
        const numberOfPlayers = playerIds.length;
        resolve({
          roomId,
          numberOfPlayers
        });
      }
    });
  })
  
  roomIds.forEach((roomId) => {
    socket.emit(SOCKET_EVENT_TYPES.EMIT, roomId);
  });
};

export { getPlayersPromise };