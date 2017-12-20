// The reason I created this function is for Test.
// Mocking this function, I can write a test for joinRoom.
const joinRoomPromise = (roomId) => {
  console.log('aaaaaaaabbbbbbb');
  // return new Promise((resolve, reject) => {
  //   socket.on(SOCKET_EVENT_TYPES.ON, (data) => {
  //     resolve(data);
  //   });
  //   socket.emit(SOCKET_EVENT_TYPES.EMIT, {roomId});
  // });
};


export { joinRoomPromise };