// See: ./index.js
const getRooms = (socket, socketNameSpace) => {
  socket.on('getRooms', () => {
    socketNameSpace.adapter.allRooms((err, rooms) => {
      socket.emit('gameRooms', rooms);
    });
  });
};

export { getRooms };