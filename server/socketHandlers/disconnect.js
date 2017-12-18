// See: ./index.js
const disconnect = (socket, socketNamespace) => { // eslint-disable-line no-unused-vars
  socket.on('disconnect', () => {});
};

export { disconnect };