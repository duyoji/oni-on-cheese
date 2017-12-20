import socket from '../socketHandlers/index';
import { joinRoomPromise } from './joinRoom/joinRoomHelper';

const SOCKET_EVENT_TYPES = {
  EMIT: 'joinRoom',
  ON: 'resultJoinRoom'
};


const joinRoom = (roomId) => {
  joinRoomPromise(roomId);
  return async function (dispatch) {
    const result = await joinRoomPromise(roomId);
    dispatch(joinRoomSuccess(roomId));
  }
};

const joinRoomSuccess = (roomId) => ({
  type: 'JOIN_ROOM',
  roomId
});

// The reason I created this function is for Test.
// Mocking this function, I can write a test for joinRoom.
// const joinRoomPromise = (roomId) => {
//   return new Promise((resolve, reject) => {
//     socket.on(SOCKET_EVENT_TYPES.ON, (data) => {
//       resolve(data);
//     });
//     socket.emit(SOCKET_EVENT_TYPES.EMIT, {roomId});
//   });
// };


export { joinRoom };