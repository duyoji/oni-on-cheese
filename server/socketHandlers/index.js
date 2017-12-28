// adapter: https://github.com/socketio/socket.io-redis
import { getRooms } from './getRooms';
import { createRoom } from './createRoom';
import { joinRoom } from './joinRoom';
import { leaveRoom } from './leaveRoom';
import { updateLocation } from './updateLocation';
import { closeGame } from './closeGame';
import { disconnect } from './disconnect';
import { getPlayerIds } from './getPlayers';

const setSocketEventHandler = (socket, socketNameSpace) => {

  // Each handler's interface should be same
  // hander takes 2 arguments
  //   socket: Socket.io#on('connection', ("socket") => {...})
  //   socketNameSpace: https://socket.io/docs/rooms-and-namespaces/
  const handlers = [
    getRooms,
    createRoom,
    joinRoom,
    leaveRoom,
    updateLocation,
    closeGame,
    disconnect,
    getPlayerIds
  ];

  handlers.forEach(handler => {
    handler(socket, socketNameSpace);
  });
};

export {setSocketEventHandler};