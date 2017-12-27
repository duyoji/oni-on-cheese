import { getRoomIdsPromise } from './helpers/getRoomsHelper';
import { getPlayersPromise } from './helpers/getPlayersHelper';

const getRoomInfo = () => {
  return async function (dispatch) {
    try {
      const roomIds = await getRoomIdsPromise();
      const room = await getPlayersPromise(roomIds);
      dispatch(getRoomInfoSuccess(room));
    } catch(err) {
      console.error(err);
    }
  };
};

const getRoomInfoSuccess = (room) => {
  return {
    type: 'GET_ROOM_INFO',
    room
  };
};

export { getRoomInfo };
