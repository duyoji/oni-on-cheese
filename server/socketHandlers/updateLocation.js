// See: ./index.js
const updateLocation = (socket, socketNamespace) => {
  socket.on('updateLocation', ({location, roomId}) => {
    if(!socket.rooms.hasOwnProperty(roomId)) {
      console.error('Need roomId');
      return;
    }
    if(!location || !location.latitude || !location.longitude) {
      console.error('Need location:{latitude, longitude}');
      return;
    }

    // TODO update user's location in redis.
    console.log('success: updateLocation');
    socketNamespace.in(roomId).emit('updateLocation', 'TODO: notify locations of all users to all.');
  });
};

export { updateLocation };