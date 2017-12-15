// See: ./index.js
const updateLocation = (socket, socketNamespace) => {
  socket.on('updateLocation', ({location, roomId}) => {
    if(!roomId) {
      return;
    }
    if(!location || !location.latitude || !location.longitude) {
      return;
    }

    // TODO update user's location in redis.
    socketNamespace.in(roomId).emit('resultUpdateLocation', 'TODO: notify locations of all users to all.');
  });
};

export { updateLocation };