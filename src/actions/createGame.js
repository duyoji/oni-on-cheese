import createRoom from '../socketHandlers/createRoom';
import socket from '../socketHandlers/index';

const createGame = () => {
  return (dispatch) => {
    createRoom(() => {
      const roomId = socket.id;
      dispatch(createGameSuccess(roomId));
    });
  };
};

function createGameSuccess (roomId) {
  return {
    type: 'CREATE_GAME',
    roomId
  };
}

export { createGame };