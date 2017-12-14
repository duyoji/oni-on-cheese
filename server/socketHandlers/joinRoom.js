// See: ./index.js
const joinRoom = (socket, socketNamespace) => {
  socket.on('joinRoom', ({roomId}) => {
    socketNamespace.adapter.remoteJoin(socket.id, roomId, (err) => {
      if (err) return;
      socket.to(roomId).emit('joinRoom', `${socket.id} has joined this room.`);
    });
  });
};

export { joinRoom };