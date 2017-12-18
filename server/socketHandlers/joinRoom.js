// See: ./index.js
const joinRoom = (socket, socketNamespace) => {
  socket.on('joinRoom', ({roomId}) => {
    socketNamespace.adapter.remoteJoin(socket.id, roomId, (err) => {
      if (err) return;
      socket.to(roomId).emit('resultJoinRoom', `${socket.id} has joined this room.`);
    });
  });
};

export { joinRoom };