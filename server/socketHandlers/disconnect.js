// See: ./index.js
const disconnect = (socket, socketNamespace) => { // eslint-disable-line no-unused-vars
  socket.on('disconnect', () => {
    // console.log('DISCONECT', socket.id, socketNamespace);
  });
};

export { disconnect };