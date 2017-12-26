import { getPlayersPromise } from './helpers/getPlayersHelper'

const getPlayers = (rooms) => {
  return async (dispatch) => {
    try {
      const updatedRooms = await Promise.all(getPlayersPromise(rooms))
        dispatch(getPlayersSuccess(updatedRooms));
    } catch(err) {
      console.error(err);
    }
  };
};

const getPlayersSuccess = (rooms) => {
  return {
    type: 'GET_PLAYERS',
    rooms
  }
}

export { getPlayers };