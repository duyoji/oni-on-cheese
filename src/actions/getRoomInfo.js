import { getRoomIdsPromise } from './helpers/getRoomsHelper';
import { getPlayersPromise } from './helpers/getPlayersHelper';

const getRoomInfo = (cb) => {
  return async function (dispatch) {
    try {
      const roomIds = await getRoomIdsPromise();
      const room = await getPlayersPromise(roomIds);
      cb(room);
    } catch(err) {
      console.error(err);
    }
  };
};

export { getRoomInfo };
