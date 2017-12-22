const EVENT_TYPES = {
  ON: 'getPlayers',
  EMIT: 'resultGetPlayers'
}

const getPlayers = (socket, socketNameSpace) => {
  socket.on(EVENT_TYPES.ON, () => {
    socket.emit(EVENT_TYPES.EMIT, () => {});
  });
};



export { getPlayers };