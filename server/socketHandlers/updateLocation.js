// See: ./index.js
const updateLocation = (socket, socketNamespace) => {
  socket.on('updateLocation', ({location, roomId}) => {
    if(!roomId) {
      console.error('Need roomId');
      return;
    }
    if(!location || !location.latitude || !location.longitude) {
      console.error('Need location:{latitude, longitude}');
      return;
    }

    // TODO update user's location in redis.
    socketNamespace.in(roomId).emit('resultUpdateLocation', 'TODO: notify locations of all users to all.');
  });
};

export { updateLocation };