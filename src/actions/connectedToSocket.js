const connectedToSocket = (socketId) => {
  return {
    type: 'CONNECTED_TO_SOCKET',
    socketId
  }
};

export { connectedToSocket };