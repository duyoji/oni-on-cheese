// See: ./index.js
const leaveRoom = (socket, socketNamespace) => {
  socket.on('leaveRoom', ({roomId}) => {
    socketNamespace.adapter.remoteLeave(socket.id, roomId, (err) => {
      if (err) return;
      socket.to(roomId).emit('resultLeaveRoom', `${socket.id} has left this room.`);
    });
  });
};

export { leaveRoom };