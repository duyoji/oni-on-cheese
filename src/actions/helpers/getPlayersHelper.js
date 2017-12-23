import socket from '../../socketHandlers/index';

const SOCKET_EVENT_TYPES = {
  EMIT: 'getPlayers',
  ON: 'resultGetPlayers'
}

const getPlayersPromise = (rooms) => {
  return rooms.map((room) => {
    const roomId = room.roomId;
    return new Promise((resolve, reject) => {
      socket.on(SOCKET_EVENT_TYPES.ON, (data) => {
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