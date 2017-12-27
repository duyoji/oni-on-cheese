import { getRoomIdsPromise } from './helpers/getRoomsHelper';
import { getPlayersPromise } from './helpers/getPlayersHelper';

const getRoomInfo = () => {
  return async function (dispatch) {
    try {
      const roomIds = await getRoomIdsPromise();
      const rooms = await Promise.all(getPlayersPromise(roomIds));
      dispatch(getRoomInfoSuccess(rooms));
    } catch(err) {
      console.error(err);
    }
  };
};

const getRoomInfoSuccess = (rooms) => {
  return {
    type: 'GET_ROOM_INFO',
    rooms
  };
};

export { getRoomInfo };
