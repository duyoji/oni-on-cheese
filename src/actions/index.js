import createRoom from '../socketHandlers/createRoom';
import io from 'socket.io-client';
const socket = io('localhost:9000/game');

const createGame = () => {
  return (dispatch) => {
    createRoom(() => {
      const roomId = socket.id;
      return dispatch(createGameSuccess(roomId))
    });
  };
}

function createGameSuccess (roomId) {
  return {
    type: 'CREATE_GAME',
    roomId
  };
}

export { createGame };