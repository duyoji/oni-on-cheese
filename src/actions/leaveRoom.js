const leaveRoom = (userId) => {
  return {
    type: 'LEAVE_ROOM',
    userId
  }
};

export { leaveRoom };