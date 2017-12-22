import { getPlayersPromise } from './helpers/getPlayersHelper'

const getPlayers = (roomId) => {
  return async function(dispatch){
    try {
      const playerIds = await getPlayersPromise(roomId);
      dispatch(getPlayersSuccess(playerIds));
    } catch(err) {
      console.error(err);
    }
  };
};

const getPlayersSuccess = (playerIds) => {
  return {
    type: 'GET_PLAYERS',
    playerIds
  }
}

export { getPlayers };