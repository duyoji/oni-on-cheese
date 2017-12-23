import { getPlayersPromise } from './helpers/getPlayersHelper'

const getPlayers = (rooms) => {
  return (dispatch) => {
    try {
      Promise.all(getPlayersPromise(rooms))
        .then((updatedRooms) => {
          dispatch(getPlayersSuccess(updatedRooms));
        })
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