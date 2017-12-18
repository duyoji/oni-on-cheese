// See: ./index.js
const closeGame = (socket, socketNamespace) => {
  socket.on('closeGame', () => {
    socketNamespace.adapter.remoteDisconnect(socket.id, true, (err) => {
      if (err) return;
    });
  });
};

export { closeGame };