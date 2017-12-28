import { formatOutput } from '../formatters/socketHandlerFormatter';

const EVENT_TYPES = {
  ON: 'getPlayers',
  EMIT: 'resultGetPlayers'
}

const getPlayerIds = (socket, socketNameSpace) => {
  socket.on(EVENT_TYPES.ON, (roomId) => {
    socketNameSpace.in(roomId).clients((err, playerIds) => {
      if(err){
        socket.emit(EVENT_TYPES.EMIT, formatOutput({error: err}));
        return;
      }
      socket.emit(EVENT_TYPES.EMIT, formatOutput({data: playerIds}));
    });
  });
};

export { getPlayerIds };