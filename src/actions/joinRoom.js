import { joinRoomPromise } from './helpers/joinRoomHelper';

const joinRoom = (roomId) => {
  return async function (dispatch) {
    try {
      await joinRoomPromise(roomId);
      dispatch(joinRoomSuccess(roomId));
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  };
};

const joinRoomSuccess = (roomId) => ({
  type: 'JOIN_ROOM',
  roomId
});

export { joinRoom };