// See: ./index.js
const createRoom = (socket, socketNamespace) => {
  socket.on('createRoom', () => {
    const roomId = socket.id;
    socketNamespace.adapter.remoteJoin(socket.id, roomId, (err) => {
      if (err) return;
      socket.emit('createRoom', 'success');
    });
  });
};

export { createRoom };