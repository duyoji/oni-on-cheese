// See: ./index.js
const disconnect = (socket, socketNamespace) => {
  socket.on('disconnect', () => {
    console.log(`disconnected, id: ${socket.id}`);
  });
};

export { disconnect };