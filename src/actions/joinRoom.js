import { joinRoomPromise } from './helpers/joinRoomHelper';

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

export { joinRoom };