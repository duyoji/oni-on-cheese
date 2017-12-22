import { formatOutput } from '../formatters/socketHandlerFormatter';

const EVENT_TYPES = {
  ON: 'getPlayers',
  EMIT: 'resultGetPlayers'
}

const getPlayers = (socket, socketNameSpace) => {
  socket.on(EVENT_TYPES.ON, () => {
    socketNameSpace.adapter.clients((err, players) => {
      if(err){
        socket.emit(EVENT_TYPES.EMIT, formatOutput({error: err}));
        return;
      }
      socket.emit(EVENT_TYPES.EMIT, formatOutput({data: players}));
    });
  });
};



export { getPlayers };