import { getPlayersHelper } from './helpers/getPlayersHelper'

const getPlayers = (roomIds) => {
  return async function(dispatch){
    try {
      const playerIds = await getPlayersHelper();
      dispatch(getPlayersSuccess(playerIds));

    } catch(err) {
      console.error(err);
    }
  };
};

const getPlayersSuccess = (playerIds) => {{
    type: 'GET_PLAYERS',
    playerIds
  }
}

export { getPlayers };