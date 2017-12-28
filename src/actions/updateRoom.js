const updateRoom = (room) => {
  return {
    type: 'UPDATE_ROOM',
    room
  };
};

export { updateRoom };