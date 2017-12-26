import { getRoomsPromise } from './helpers/getRoomsHelper';
import { getPlayersPromise } from './helpers/getPlayersHelper'

const getRoomInfo = () => {
  return async function (dispatch) {
    try {
      const roomIds = await getRoomsPromise();
      let rooms = roomIds.map((roomId) => {
        return {roomId};
      });
      rooms = await Promise.all(getPlayersPromise(rooms))
      dispatch(getRoomInfoSuccess(rooms));
    } catch(err) {
      console.error(err);
    }
  };
}

const getRoomInfoSuccess = (rooms) => {
  return {
    type: 'GET_ROOM_INFO',
    rooms
  }
}

export { getRoomInfo };
