// See: ./index.js
const getRooms = (socket, socketNamespace) => {
  socket.on('getRooms', () => {
    socketNamespace.adapter.allRooms((err, rooms) => {
      socket.emit('gameRooms', rooms);
    });
  });
};

export { getRooms };