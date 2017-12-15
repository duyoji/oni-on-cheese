// See: ./index.js
const disconnect = (socket, socketNamespace) => {
  socket.on('disconnect', () => {});
};

export { disconnect };