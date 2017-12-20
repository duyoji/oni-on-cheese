import socket from '../../socketHandlers/index';

const SOCKET_EVENT_TYPES = {
  EMIT: 'joinRoom',
  ON: 'resultJoinRoom'
};

// The reason I created this function is for Test.
// Mocking this function, I can write a test for joinRoom.
// Notes:
// Actually, I wanted to put this function in action/joinRoom.js.
// But when I try to create mock of `joinRoomPromise` function in action/joinRoom.js,
// I couldn't make mock. So I create this function in new file.
const joinRoomPromise = (roomId) => {
  return new Promise((resolve, reject) => {
    socket.on(SOCKET_EVENT_TYPES.ON, (data) => {
      resolve(data);
    });
    socket.emit(SOCKET_EVENT_TYPES.EMIT, {roomId});
  });
};


export { joinRoomPromise };