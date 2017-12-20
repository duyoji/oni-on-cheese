import socket from '../../socketHandlers/index';

const SOCKET_EVENT_TYPES = {
  EMIT: 'getRooms',
  ON: 'resultGetRooms'
};

// The reason I created this function is for Test.
// Mocking this function, I can write a test for joinRoom.
// Notes:
// Actually, I wanted to put this function in action/joinRoom.js.
// But when I try to create mock of `joinRoomPromise` function in action/joinRoom.js,
// I couldn't make mock. So I create this function in new file.
const getRoomsPromise = (roomId) => {
  return new Promise((resolve, reject) => {
    socket.on(SOCKET_EVENT_TYPES.ON, (data) => {
      if(data.result.error) {
        resolve(data.result.error);
      } else {
        const roomIds = data.result.data;
        resolve(roomIds);
      }
    });
    socket.emit(SOCKET_EVENT_TYPES.EMIT, {roomId});
  });
};

export { getRoomsPromise };